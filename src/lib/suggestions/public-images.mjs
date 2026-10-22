import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sourceRoute, validateImage } from './document.mjs';
import annotationRegistry from '../../../authoring/image-annotations.json' with { type: 'json' };
import { annotationFigure, validateImageAnnotations } from '../doc-image-annotations.mjs';

// Astro otherwise treats relative Markdown images as source-file imports.
// Public assets use paths relative to the rendered route so authored Markdown
// also works in the offline manual. Rewrite only the render tree, before Astro
// collects image imports, and include the configured deployment base.
export default function publicImages({ base = '/', docsRoot = fileURLToPath(new URL('../../content/docs/', import.meta.url)), annotations = annotationRegistry } = {}) {
  const annotatedImages = validateImageAnnotations(annotations);
  return (tree, file) => {
    if (!file.path) return;
    const name = path.relative(docsRoot, file.path).split(path.sep).join('/');
    if (name.startsWith('../') || !name.endsWith('.md')) return;
    const route = sourceRoute(name);
    const resolvedImages = new WeakMap();
    const definitions = new Map();
    function collectDefinitions(node) {
      if (node.type === 'definition' && !definitions.has(node.identifier.toLowerCase())) definitions.set(node.identifier.toLowerCase(), node.url);
      node.children?.forEach(collectDefinitions);
    }
    collectDefinitions(tree);
    function visit(node) {
      if (node.type === 'image') {
        validateImage(node, route);
        const target = node.url.split(/[?#]/)[0];
        const decodedPath = path.posix.normalize(path.posix.join(route, decodeURIComponent(target)));
        if (decodedPath === '..' || decodedPath.startsWith('../')) throw new Error('Image URL leaves the documentation base path.');
        const assetPath = path.posix.normalize(path.posix.join(route, target));
        const suffix = node.url.slice(target.length);
        node.url = `${base.replace(/\/$/, '')}/${assetPath}${suffix}`;
        resolvedImages.set(node, decodedPath);
      }
      if (node.type === 'link' || node.type === 'linkReference') {
        const url = node.type === 'link' ? node.url : definitions.get(node.identifier.toLowerCase());
        // Static hosts do not all assign a MIME type to .hxc files. Request a
        // download explicitly instead of relying on content-type sniffing.
        if (url && !/^(?:[a-z][a-z\d+.-]*:|\/)/i.test(url) && /\.hxc$/i.test(decodeURIComponent(url.split(/[?#]/)[0]))) {
          node.data ??= {};
          node.data.hProperties = { ...node.data.hProperties, download: true };
        }
      }
      node.children?.forEach(visit);
    }
    visit(tree);
    function annotate(parent) {
      if (!parent.children) return;
      parent.children = parent.children.map(node => {
        const content = node.type === 'paragraph' && node.children?.length === 1 ? node.children[0] : undefined;
        const link = content?.type === 'link' && content.children?.length === 1 ? content : undefined;
        const image = content?.type === 'image' ? content : link?.children[0]?.type === 'image' ? link.children[0] : undefined;
        const annotation = image && annotatedImages.get(resolvedImages.get(image));
        if (!annotation || (annotation.page && annotation.page !== `src/content/docs/${name}`)) { annotate(node); return node; }
        const documentUrl = new URL(`${base.replace(/\/$/, '')}/${route ? `${route}/` : ''}`, 'https://manual.invalid');
        const target = new URL(image.url, documentUrl);
        const existing = link && new URL(link.url, documentUrl);
        const fullSizeLink = !existing || (existing.origin === target.origin && existing.pathname === target.pathname);
        const figure = annotationFigure(image, annotation, { link, fullSizeLink });
        // Replace the standalone paragraph, avoiding a figure nested inside p
        // or an image anchor nested inside its existing full-size anchor.
        return { type: 'paragraph', children: [], data: { hName: figure.tagName, hProperties: figure.properties, hChildren: figure.children } };
      });
    }
    annotate(tree);
  };
}
