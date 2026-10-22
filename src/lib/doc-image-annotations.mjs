const sides = ['left', 'right', 'top', 'bottom'];
const finite = value => typeof value === 'number' && Number.isFinite(value);
const text = value => typeof value === 'string' && value.trim().length > 0 && !/[\u0000-\u001f\u007f]/.test(value);

// Coordinates describe the published PNG, never a fabricated replacement UI.
export function validateImageAnnotations(registry, dimensions) {
  if (registry?.schemaVersion !== 1 || registry.coordinateSystem !== 'published-image-pixels' || !Array.isArray(registry.images))
    throw new Error('Image annotations require schemaVersion 1 and published-image-pixels.');
  const result = new Map(), ids = new Set();
  for (const image of registry.images) {
    if (!/^[a-z][a-z0-9-]*$/.test(image.id || '') || ids.has(image.id)) throw new Error('Annotation image IDs must be unique safe names.');
    if (typeof image.source !== 'string' || !/^images\/[A-Za-z0-9._/-]+\.png$/.test(image.source)
        || image.source.split('/').some(part => ['', '.', '..'].includes(part)) || result.has(image.source))
      throw new Error(`${image.id}: use a unique PNG path beneath images/.`);
    if (![image.width, image.height].every(value => Number.isSafeInteger(value) && value > 0))
      throw new Error(`${image.id}: published dimensions must be positive integers.`);
    if (image.page !== undefined && (typeof image.page !== 'string' || !/^src\/content\/docs\/[A-Za-z0-9_./-]+\.md$/.test(image.page)
        || image.page.split('/').some(part => ['', '.', '..'].includes(part)))) throw new Error(`${image.id}: invalid annotation page.`);
    if (!Array.isArray(image.targets) || image.targets.length < 1 || image.targets.length > 2)
      throw new Error(`${image.id}: use one or two targets per screenshot.`);
    const actual = dimensions?.get(image.source);
    if (dimensions && (!actual || actual.width !== image.width || actual.height !== image.height))
      throw new Error(`${image.id}: annotation dimensions differ from the published PNG.`);
    const targets = image.targets.map((target, index) => {
      if (target.number !== index + 1 || !text(target.label) || target.label.length > 100
          || (target.description !== undefined && (!text(target.description) || target.description.length > 300)))
        throw new Error(`${image.id}: targets need sequential numbers and concise text labels.`);
      if (![target.x, target.y, target.width, target.height].every(finite) || target.x < 0 || target.y < 0
          || target.width <= 0 || target.height <= 0 || target.x + target.width > image.width || target.y + target.height > image.height)
        throw new Error(`${image.id}: target ${target.number} must fit inside the published PNG.`);
      let badge = target.badge;
      if (badge) {
        if (!sides.includes(badge.side) || !finite(badge.position) || badge.position < 0
            || badge.position > (['left', 'right'].includes(badge.side) ? image.height : image.width))
          throw new Error(`${image.id}: badge ${target.number} must name an edge and a position along it.`);
        badge = { side: badge.side, position: badge.position };
      } else {
        const distances = [target.x, image.width - target.x - target.width, target.y, image.height - target.y - target.height];
        const side = sides[distances.indexOf(Math.min(...distances))];
        badge = { side, position: ['left', 'right'].includes(side) ? target.y + target.height / 2 : target.x + target.width / 2 };
      }
      return { ...target, badge };
    });
    ids.add(image.id);
    result.set(image.source, { ...image, targets });
  }
  return result;
}

const element = (tagName, properties = {}, children = []) => ({ type: 'element', tagName, properties, children });
const literal = value => ({ type: 'text', value: String(value) });
const percentage = (value, length) => `${Number((value / length * 100).toFixed(5))}%`;

// HAST is built from validated numbers and text nodes; no authored HTML is enabled.
export function annotationFigure(image, annotation, { link, fullSizeLink = true } = {}) {
  const imageNode = element('img', { src: image.url, alt: image.alt, width: annotation.width, height: annotation.height,
    ...(image.title ? { title: image.title } : {}) });
  const imageLink = element('a', { href: link?.url ?? image.url,
    title: link?.title ?? (fullSizeLink ? 'Open full-size screenshot' : undefined),
    ...(fullSizeLink ? { 'aria-label': `Open full-size screenshot: ${image.alt}`, 'data-original-screenshot': '' } : {}),
    className: ['doc-image-original'] }, [imageNode]);
  const shapes = [], badges = [];
  for (const target of annotation.targets) {
    const { x, y, width, height, number, badge } = target;
    let x1 = x + width / 2, y1 = y + height / 2, x2 = x1, y2 = y1;
    if (badge.side === 'left') { x1 = x; x2 = 0; y2 = badge.position; }
    if (badge.side === 'right') { x1 = x + width; x2 = annotation.width; y2 = badge.position; }
    if (badge.side === 'top') { y1 = y; y2 = 0; x2 = badge.position; }
    if (badge.side === 'bottom') { y1 = y + height; y2 = annotation.height; x2 = badge.position; }
    // Long connectors can cross unrelated labels and values in the real UI.
    // Keep only short edge ticks; the outline and outside badge still identify
    // targets further inside the screenshot without covering other controls.
    if (Math.hypot(x2 - x1, y2 - y1) <= 24)
      shapes.push(element('line', { x1, y1, x2, y2, vectorEffect: 'non-scaling-stroke' }));
    shapes.push(element('rect', { x, y, width, height, rx: 3, vectorEffect: 'non-scaling-stroke', 'data-annotation-target': String(number) }));
    badges.push(element('span', { className: ['doc-image-marker', `doc-image-marker-${badge.side}`], 'aria-hidden': 'true',
      style: `--marker-position:${percentage(badge.position, ['left', 'right'].includes(badge.side) ? annotation.height : annotation.width)}` }, [literal(number)]));
  }
  const overlay = element('svg', { className: ['doc-image-targets'], viewBox: `0 0 ${annotation.width} ${annotation.height}`,
    preserveAspectRatio: 'none', 'aria-hidden': 'true', focusable: 'false' }, shapes);
  const frame = element('div', { className: ['doc-image-frame', ...new Set(annotation.targets.map(target => `doc-image-gutter-${target.badge.side}`))] }, [
    element('div', { className: ['doc-image-canvas'] }, [imageLink, overlay, ...badges]),
  ]);
  const legend = element('ol', { className: ['doc-image-legend'], role: 'list', 'aria-label': 'Screenshot markers' }, annotation.targets.map(target =>
    element('li', {}, [element('span', { className: ['doc-image-legend-number'], 'aria-hidden': 'true' }, [literal(target.number)]),
      element('span', {}, [literal(target.label)])])));
  const caption = element('figcaption', { 'data-pagefind-ignore': '' }, [legend,
    ...(!fullSizeLink ? [element('a', { href: image.url, 'data-original-screenshot': '' }, [literal('Open full-size screenshot')])] : []),
  ]);
  return element('figure', { className: ['doc-annotated-image'], 'data-image-annotation': annotation.id }, [frame, caption]);
}
