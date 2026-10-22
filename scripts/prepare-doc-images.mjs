#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { lstat, mkdir, readFile, realpath, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// Usage: node scripts/prepare-doc-images.mjs [authoring/captures/DATE/manifest.json] [--check]
// Originals are immutable. Only the selected manifest and public/images/*.png
// derivatives are written; --check performs the same transform without writes.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const check = args.includes('--check');
const positional = args.filter((arg) => arg !== '--check');
if (positional.length > 1 || args.some((arg) => arg.startsWith('--') && arg !== '--check')) {
  throw new Error('Usage: prepare-doc-images.mjs [capture manifest] [--check]');
}

function within(parent, child) {
  const relative = path.relative(parent, child);
  return relative !== '' && relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}

function relativePath(value, parent, label) {
  if (typeof value !== 'string' || path.isAbsolute(value)) {
    throw new Error(`${label} must be a repository-relative path.`);
  }
  const resolved = path.resolve(root, value);
  if (!within(parent, resolved)) throw new Error(`${label} is outside its allowed directory: ${value}`);
  return resolved;
}

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

const captureRoot = path.join(root, 'authoring/captures');
const manifestPath = relativePath(positional[0] ?? 'authoring/captures/2026-10-21/manifest.json', captureRoot, 'Manifest');
if (path.basename(manifestPath) !== 'manifest.json' || (await lstat(manifestPath)).isSymbolicLink()
    || !within(await realpath(captureRoot), await realpath(manifestPath))) {
  throw new Error('Use a manifest.json file inside authoring/captures.');
}
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
if (manifest.schemaVersion !== 1 || !Array.isArray(manifest.images)) {
  throw new Error('Expected schemaVersion 1 and an images array.');
}
const originalRoot = await realpath(path.join(path.dirname(manifestPath), 'originals'));
const outputRoot = path.join(root, 'public/images');
const publicRoot = await realpath(path.join(root, 'public'));
if (!within(await realpath(root), publicRoot)) throw new Error('public must remain inside this repository.');

const seen = new Set();
const prepared = [];
for (const entry of manifest.images) {
  const source = relativePath(entry.source, path.join(path.dirname(manifestPath), 'originals'), 'Source');
  const published = relativePath(entry.published, outputRoot, 'Published image');
  if (path.extname(source) !== '.png' || path.extname(published) !== '.png') {
    throw new Error(`${entry.id}: only PNG screenshots and PNG derivatives are supported.`);
  }
  if (!entry.id || seen.has(entry.id) || seen.has(published)) throw new Error('Image IDs and destinations must be unique.');
  seen.add(entry.id);
  seen.add(published);
  if (!within(originalRoot, await realpath(source))) throw new Error(`${entry.id}: source leaves originals/.`);
  const sourceBytes = await readFile(source);
  const sourceHash = sha256(sourceBytes);
  if (entry.sourceSha256 && entry.sourceSha256 !== sourceHash) {
    throw new Error(`${entry.id}: original hash changed. Preserve originals and record a new capture.`);
  }
  const metadata = await sharp(sourceBytes).metadata();
  const crop = entry.crop;
  if (!crop || !['left', 'top', 'width', 'height'].every((key) => Number.isSafeInteger(crop[key]))
      || crop.left < 0 || crop.top < 0 || crop.width < 1 || crop.height < 1
      || crop.left + crop.width > metadata.width || crop.top + crop.height > metadata.height) {
    throw new Error(`${entry.id}: crop must fit inside the original screenshot.`);
  }
  let pipeline = sharp(sourceBytes, { failOn: 'error' }).extract(crop);
  if (entry.resize != null) {
    if (!Number.isSafeInteger(entry.resize.width) || entry.resize.width < 1 || entry.resize.width > crop.width
        || Object.keys(entry.resize).some((key) => key !== 'width')) {
      throw new Error(`${entry.id}: resize accepts a width no larger than the crop.`);
    }
    pipeline = pipeline.resize({ width: entry.resize.width, withoutEnlargement: true, kernel: 'lanczos3' });
  }
  const { data, info } = await pipeline.png({ compressionLevel: 9, adaptiveFiltering: false }).toBuffer({ resolveWithObject: true });
  const updated = {
    ...entry,
    sourceDimensions: { width: metadata.width, height: metadata.height },
    publishedDimensions: { width: info.width, height: info.height },
    sourceSha256: sourceHash,
    publishedSha256: sha256(data),
  };
  if (check) {
    for (const key of ['sourceDimensions', 'publishedDimensions', 'sourceSha256', 'publishedSha256']) {
      if (JSON.stringify(entry[key]) !== JSON.stringify(updated[key])) throw new Error(`${entry.id}: recorded ${key} is stale.`);
    }
    if (sha256(await readFile(published)) !== updated.publishedSha256) throw new Error(`${entry.id}: derivative differs from its transform.`);
  }
  prepared.push({ published, data, entry: updated });
}

if (!check) {
  // Check each existing ancestor before mkdir/write so symlinks cannot redirect
  // a manifest destination outside public/images.
  for (const item of prepared) {
    let ancestor = path.dirname(item.published);
    while (true) {
      try {
        const actual = await realpath(ancestor);
        if (actual !== publicRoot && !within(publicRoot, actual)) throw new Error('Image destination leaves public/.');
        if (ancestor === outputRoot || within(outputRoot, ancestor)) {
          if (actual !== outputRoot && !within(outputRoot, actual)) throw new Error('Image destination leaves public/images/.');
        }
        break;
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
        ancestor = path.dirname(ancestor);
      }
    }
    try {
      if ((await lstat(item.published)).isSymbolicLink()) throw new Error('Image destination cannot be a symlink.');
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    await mkdir(path.dirname(item.published), { recursive: true });
    await writeFile(item.published, item.data);
  }
  manifest.images = prepared.map((item) => item.entry);
  manifest.processing = {
    ...manifest.processing,
    sharpVersion: sharp.versions.sharp,
    libvipsVersion: sharp.versions.vips,
  };
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}
for (const { entry } of prepared) {
  console.log(`${check ? 'Verified' : 'Prepared'} ${entry.published} (${entry.publishedDimensions.width}x${entry.publishedDimensions.height})`);
}
