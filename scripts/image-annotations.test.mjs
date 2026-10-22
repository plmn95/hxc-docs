import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { validateImageAnnotations } from '../src/lib/doc-image-annotations.mjs';
import publicImages from '../src/lib/suggestions/public-images.mjs';

const registry = () => ({ schemaVersion: 1, coordinateSystem: 'published-image-pixels', images: [{ id: 'panel', source: 'images/panel.png',
  width: 600, height: 400, page: 'src/content/docs/guides/example.md', targets: [{ number: 1, x: 490, y: 100, width: 100, height: 30,
    label: 'Depth', description: 'Authoring note, not repeated in the reader legend.' }] }] });

test('published coordinates choose the nearest outside gutter and accept explicit edge positions', () => {
  const input = registry();
  assert.deepEqual(validateImageAnnotations(input).get('images/panel.png').targets[0].badge, { side: 'right', position: 115 });
  input.images[0].targets[0].badge = { side: 'top', position: 250 };
  assert.deepEqual(validateImageAnnotations(input).get('images/panel.png').targets[0].badge, { side: 'top', position: 250 });
  assert.deepEqual(input.images[0].targets[0].badge, { side: 'top', position: 250 }, 'validation must not rewrite authoring metadata');
});

test('invalid coordinates, dimensions, numbering, and badge positions cannot render misleading targets', () => {
  const mutations = [
    r => r.images[0].targets[0].x = -1, r => r.images[0].targets[0].width = 120,
    r => r.images[0].targets[0].height = Infinity, r => r.images[0].height = 0,
    r => r.images[0].targets[0].number = 2,
    r => r.images[0].targets[0].badge = { side: 'right', position: 401 },
    r => r.images[0].targets[0].badge = { side: 'inside', position: 5 },
    r => r.images[0].targets = Array(3).fill(r.images[0].targets[0]),
  ];
  for (const mutate of mutations) { const input = registry(); mutate(input); assert.throws(() => validateImageAnnotations(input)); }
  assert.throws(() => validateImageAnnotations(registry(), new Map([['images/panel.png', { width: 601, height: 400 }]])), /dimensions differ/);
});

test('annotation identities and public PNG paths reject collisions and traversal', () => {
  for (const source of ['/images/panel.png', 'images/../panel.png', 'images//panel.png', 'https://example.test/panel.png', 'images/panel.svg', 'images/panel.png?script=1']) {
    const input = registry(); input.images[0].source = source; assert.throws(() => validateImageAnnotations(input));
  }
  const duplicate = registry(); duplicate.images.push({ ...duplicate.images[0] }); assert.throws(() => validateImageAnnotations(duplicate));
  const wrongCoordinates = registry(); wrongCoordinates.coordinateSystem = 'source-image-pixels'; assert.throws(() => validateImageAnnotations(wrongCoordinates));
});

async function render(markdown, annotations = registry(), name = 'guides/example.md', base = '/manuals/v0.21.2/') {
  const docsRoot = path.resolve('src/content/docs');
  const processor = await createMarkdownProcessor({ syntaxHighlight: false, smartypants: false,
    remarkPlugins: [[publicImages, { base, docsRoot, annotations }]] });
  return processor.render(markdown, { fileURL: pathToFileURL(path.join(docsRoot, name)) });
}

test('standalone PNGs render semantic figures with aligned SVG coordinates, readable gutter positions, and compact labels', async () => {
  const { code, metadata } = await render('![The source controls.](../../images/panel.png "Controls")');
  assert.deepEqual(metadata.localImagePaths, []);
  assert.ok(code.startsWith('<figure '), 'replace the paragraph instead of nesting a figure inside it');
  assert.match(code, /viewBox="0 0 600 400"/);
  assert.match(code, /x="490" y="100" width="100" height="30"/);
  assert.match(code, /vector-effect="non-scaling-stroke"/);
  assert.match(code, /--marker-position:28.75%/);
  assert.match(code, /aria-hidden="true"/);
  assert.match(code, /<figcaption[^>]*><ol[^>]*aria-label="Screenshot markers"/);
  assert.match(code, /<span>Depth<\/span>/);
  assert.ok(!code.includes('Authoring note'), 'do not duplicate the instructions in the legend');
  assert.equal((code.match(/<a\b/g) || []).length, 1);
  assert.match(code, /href="\/manuals\/v0.21.2\/images\/panel.png"/);
  assert.match(code, /alt="The source controls\."/);
});

test('existing linked screenshots keep one original link without nested anchors across base paths', async () => {
  for (const base of ['/', '/hxc-docs/', '/manuals/v0.21.2/']) {
    const { code } = await render('[![Controls.](../../images/panel.png)](../../images/panel.png "Enlarge")', registry(), 'guides/example.md', base);
    assert.equal((code.match(/<a\b/g) || []).length, 1);
    assert.match(code, /title="Enlarge"/);
    assert.equal((code.match(/data-original-screenshot/g) || []).length, 1);
  }
  const { code } = await render('[![Controls.](../../images/panel.png)](../different/)');
  assert.equal((code.match(/<a\b/g) || []).length, 2, 'keep unrelated image navigation and one distinct original screenshot link');
  assert.match(code, /href="\.\.\/different\/"/);
  assert.equal((code.match(/data-original-screenshot/g) || []).length, 1);
});

test('long internal leaders never cross the real app content', async () => {
  const near = await render('![Controls.](../../images/panel.png)');
  assert.equal((near.code.match(/<line\b/g) || []).length, 1, 'a 10-pixel edge tick is safe');
  for (const mutate of [
    r => r.images[0].targets[0].x = 300,
    r => r.images[0].targets[0].badge = { side: 'right', position: 350 },
  ]) {
    const input = registry(); mutate(input);
    const { code } = await render('![Controls.](../../images/panel.png)', input);
    assert.ok(!code.includes('<line'), 'omit long straight and diagonal internal connectors');
    assert.match(code, /<rect /, 'retain the target outline');
    assert.match(code, /doc-image-marker/, 'retain the numbered outside badge');
    assert.match(code, /<span>Depth<\/span>/, 'retain the accessible target label');
  }
});

test('unlisted outputs, inline images, and other pages retain ordinary Markdown image rendering', async () => {
  for (const [markdown, name] of [['![Result.](../../images/result.png)', 'guides/example.md'],
    ['Text ![Controls.](../../images/panel.png) in a paragraph.', 'guides/example.md'],
    ['![Controls.](../../images/panel.png)', 'guides/other.md']]) {
    const { code } = await render(markdown, registry(), name);
    assert.ok(code.includes('<img'));
    assert.ok(!code.includes('<figure'));
  }
});

test('registry text is escaped as text rather than interpreted as HTML or attributes', async () => {
  const input = registry(); input.images[0].targets[0].label = '<script>alert("label")</script>';
  const { code } = await render('![Controls.](../../images/panel.png)', input);
  assert.ok(!code.includes('<script>'));
  assert.match(code, /&#x3C;script>|&lt;script>/);
});
