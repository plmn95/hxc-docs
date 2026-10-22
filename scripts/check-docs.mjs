import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseBody, sourceRoute, validateImage } from '../src/lib/suggestions/document.mjs';
import sharp from 'sharp';
import annotationRegistry from '../authoring/image-annotations.json' with { type: 'json' };
import { validateImageAnnotations } from '../src/lib/doc-image-annotations.mjs';

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(entryPath)));
    if (entry.isFile() && entry.name.endsWith('.md')) files.push(entryPath);
  }
  return files;
}

export async function checkDocs({ docsRoot = path.resolve('src/content/docs'), publicRoot = path.resolve('public'),
  annotations = docsRoot === path.resolve('src/content/docs') && publicRoot === path.resolve('public') ? annotationRegistry : null } = {}) {
  const files = await walk(docsRoot);
  const errors = [];
  const imageUses = new Map();
  const routes = new Set(
    files.map((file) => {
      const sourcePath = path.relative(docsRoot, file).split(path.sep).join('/');
      return sourceRoute(sourcePath);
    }),
  );

  for (const file of files) {
    const source = await readFile(file, 'utf8');
    const name = path.relative(docsRoot, file).split(path.sep).join('/');
    const currentRoute = sourceRoute(name);
    const frontmatter = source.match(/^---\n([\s\S]*?)\n---\n/);
    const titleMatches = frontmatter?.[1].match(/^title:\s*.+$/gm) ?? [];
    if (!frontmatter || titleMatches.length !== 1) {
      errors.push(`${name}: expected one frontmatter title`);
    }
    if (!/^description:\s*\S.+$/m.test(frontmatter?.[1] ?? '')) {
      errors.push(`${name}: expected a page-specific frontmatter description`);
    }
    if (/^#\s+/m.test(source.slice(frontmatter?.[0].length ?? 0))) {
      errors.push(`${name}: body contains an H1; Starlight renders the page title`);
    }

    const nodes = [], definitions = new Map();
    function visit(node) {
      if (node.type === 'definition' && !definitions.has(node.identifier.toLowerCase())) definitions.set(node.identifier.toLowerCase(), node.url);
      if (['link', 'linkReference', 'image', 'imageReference'].includes(node.type)) nodes.push(node);
      node.children?.forEach(visit);
    }
    visit(parseBody(source.slice(frontmatter?.[0].length ?? 0)));
    for (const node of nodes) {
      if (node.type === 'imageReference') {
        errors.push(`${name}: use an inline Markdown image so the visual editor can preserve it`);
        continue;
      }
      const rawTarget = node.type === 'linkReference' ? definitions.get(node.identifier.toLowerCase()) : node.url;
      if (!rawTarget) continue;
      let target;
      try { target = decodeURIComponent(rawTarget.split(/[?#]/)[0]); }
      catch { errors.push(`${name}: invalid URL ${rawTarget}`); continue; }
      const local = !/^[a-z][a-z\d+.-]*:/i.test(target) && !target.startsWith('//');
      if (node.type === 'image') {
        try { validateImage(node); }
        catch (error) { errors.push(`${name}: ${error.message} (${rawTarget})`); continue; }
      }
      if (node.type === 'image' || (local && /\.hxc$/i.test(target))) {
        if (target.startsWith('/') || target.includes('\\') || /[\u0000-\u001f\u007f]/.test(target)) {
          errors.push(`${name}: asset URL must be relative to work with documentation base paths: ${rawTarget}`);
          continue;
        }
        const assetPath = path.posix.normalize(path.posix.join(currentRoute, target));
        if (assetPath === '..' || assetPath.startsWith('../')) {
          errors.push(`${name}: asset URL leaves the documentation base path: ${rawTarget}`);
          continue;
        }
        const exists = await stat(path.join(publicRoot, assetPath)).then(info => info.isFile(), () => false);
        if (!exists) errors.push(`${name}: missing local ${node.type === 'image' ? 'image' : 'patch'} ${rawTarget}`);
        if (node.type === 'image') {
          if (!imageUses.has(assetPath)) imageUses.set(assetPath, new Set());
          imageUses.get(assetPath).add(`src/content/docs/${name}`);
        }
        continue;
      }
      if (!target || !local || target.startsWith('/')) continue;
      if (target.endsWith('.md')) {
        errors.push(`${name}: source link must use a Starlight route, not ${rawTarget}`);
        continue;
      }
      if (!target.endsWith('/')) continue;
      const resolvedRoute = path.posix.normalize(path.posix.join(currentRoute, target));
      const normalizedRoute = resolvedRoute === '.' ? '' : resolvedRoute.replace(/\/$/, '');
      if (!routes.has(normalizedRoute)) {
        errors.push(`${name}: missing route target ${rawTarget}`);
      }
    }
  }

  if (annotations) {
    try {
      const entries = validateImageAnnotations(annotations), dimensions = new Map();
      for (const entry of entries.values()) {
        const metadata = await sharp(path.join(publicRoot, entry.source)).metadata();
        dimensions.set(entry.source, { width: metadata.width, height: metadata.height });
        const uses = imageUses.get(entry.source);
        if (!uses?.size || (entry.page && !uses.has(entry.page))) errors.push(`${entry.id}: annotation image is not used by its documented page`);
      }
      validateImageAnnotations(annotations, dimensions);
    } catch (error) { errors.push(`Image annotations: ${error.message}`); }
  }

  if (files.length === 0) errors.push('no documentation pages found');
  return { errors, count: files.length };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const { errors, count } = await checkDocs();
  if (errors.length > 0) {
    console.error(errors.join('\n'));
    process.exitCode = 1;
  } else {
    console.log(`Validated ${count} documentation pages.`);
  }
}
