import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { checkDocs } from './check-docs.mjs';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { pathToFileURL } from 'node:url';
import publicImages from '../src/lib/suggestions/public-images.mjs';
import sharp from 'sharp';

async function fixture(t, body, route = 'guides/example.md', options = {}) {
  const root = await mkdtemp(path.join(tmpdir(), 'vizard-doc-check-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const docsRoot = path.join(root, 'docs'), publicRoot = path.join(root, 'public');
  await mkdir(path.dirname(path.join(docsRoot, route)), { recursive: true });
  await mkdir(path.join(publicRoot, 'images'), { recursive: true });
  await mkdir(path.join(publicRoot, 'patches'), { recursive: true });
  await writeFile(path.join(docsRoot, route), `---\ntitle: Example\ndescription: A specific example page.\n---\n\n${body}\n`);
  await writeFile(path.join(publicRoot, 'images', 'panel.png'), options.annotations
    ? await sharp({ create: { width: 400, height: 200, channels: 3, background: '#111111' } }).png().toBuffer() : 'image fixture');
  await writeFile(path.join(publicRoot, 'patches', 'Example patch.hxc'), 'patch fixture');
  return checkDocs({ docsRoot, publicRoot, ...options });
}

test('annotation metadata must match the real PNG dimensions and its authored page', async t => {
  const annotations = { schemaVersion: 1, coordinateSystem: 'published-image-pixels', images: [{ id: 'panel', source: 'images/panel.png',
    width: 400, height: 200, page: 'src/content/docs/guides/example.md', targets: [{ number: 1, x: 20, y: 20, width: 100, height: 40, label: 'Depth' }] }] };
  const body = '![Controls.](../../images/panel.png)';
  assert.deepEqual((await fixture(t, body, 'guides/example.md', { annotations })).errors, []);
  const stale = structuredClone(annotations); stale.images[0].width = 401;
  assert.ok((await fixture(t, body, 'guides/example.md', { annotations: stale })).errors.some(error => error.includes('dimensions differ')));
  const wrongPage = structuredClone(annotations); wrongPage.images[0].page = 'src/content/docs/guides/missing.md';
  assert.ok((await fixture(t, body, 'guides/example.md', { annotations: wrongPage })).errors.some(error => error.includes('not used')));
});

test('validates relative public images and patch downloads from the rendered page route', async t => {
  const result = await fixture(t, '![Panel with the source selected.](../../images/panel.png "Source controls")\n\n[Example patch](../../patches/Example%20patch.hxc?download=1)');
  assert.deepEqual(result.errors, []);
  assert.equal(result.count, 1);
  assert.deepEqual((await fixture(t, '![Panel](../images/panel.png)', 'guides/index.md')).errors, []);
});

test('reports missing images, missing patch downloads and missing alt text', async t => {
  const result = await fixture(t, '![Panel](../../images/missing.png)\n\n[Patch](../../patches/missing.hxc)\n\n![](../../images/panel.png)');
  assert.equal(result.errors.length, 3);
  assert.ok(result.errors.some(error => error.includes('missing local image')));
  assert.ok(result.errors.some(error => error.includes('missing local patch')));
  assert.ok(result.errors.some(error => error.includes('alt text')));
});

test('reference-style patch downloads receive the same existence and base-path checks', async t => {
  const result = await fixture(t, '[Valid patch][valid]\n\n[Missing patch][missing]\n\n[Root patch][root]\n\n[valid]: ../../patches/Example%20patch.hxc\n[missing]: ../../patches/missing.hxc\n[root]: /examples/missing.hxc');
  assert.equal(result.errors.length, 2);
  assert.ok(result.errors.some(error => error.includes('missing local patch')));
  assert.ok(result.errors.some(error => error.includes('relative to work')));
});

test('patch references follow CommonMark first-definition precedence', async t => {
  const invalidFirst = await fixture(t, '[Patch][download]\n\n[download]: /examples/missing.hxc\n[download]: ../../patches/Example%20patch.hxc');
  assert.equal(invalidFirst.errors.length, 1);
  assert.ok(invalidFirst.errors[0].includes('relative to work'));
  const validFirst = await fixture(t, '[Patch][download]\n\n[download]: ../../patches/Example%20patch.hxc\n[download]: /examples/missing.hxc');
  assert.deepEqual(validFirst.errors, []);
});

test('rejects image and local patch URLs that bypass the documentation base path', async t => {
  const result = await fixture(t, '![Panel](/images/panel.png)\n\n[Patch](/patches/example.hxc)\n\n![Panel](../../../images/panel.png)\n\n[Patch](../../../patches/example.hxc)');
  assert.equal(result.errors.length, 4);
  assert.ok(result.errors.some(error => error.includes('relative URL')));
  assert.ok(result.errors.some(error => error.includes('relative to work')));
  assert.equal(result.errors.filter(error => error.includes('leaves the documentation base')).length, 2);
});

test('ignores examples in code and external patch downloads while rejecting unsafe images', async t => {
  const result = await fixture(t, '```md\n![Example](missing.png)\n[Example](missing.hxc)\n```\n\n[External patch](https://example.test/patch.hxc)\n\n![Remote](https://example.test/panel.png)\n\n![Inline](data:image/png;base64,AAAA)');
  assert.equal(result.errors.length, 2);
  assert.ok(result.errors.every(error => error.includes('relative URL')));
});

test('keeps route checking and parses titles and nested parentheses accurately', async t => {
  const result = await fixture(t, '[Missing route](../missing/ "Go there")\n\n![Panel](../../images/panel(1).png "Controls")');
  assert.equal(result.errors.length, 2);
  assert.ok(result.errors.some(error => error.includes('missing route target')));
  assert.ok(result.errors.some(error => error.includes('missing local image ../../images/panel(1).png')));
});

test('Astro renders public images under root and nested bases without trying source-file imports', async () => {
  const docsRoot = path.resolve('src/content/docs');
  const markdown = '![Panel controls.](../../images/panel%20detail.png "Source controls")\n\n[Patch](../../examples/patch.hxc)\n\n[Referenced patch][patch]\n\n[patch]: ../../examples/another.hxc';
  for (const base of ['/', '/hxc-docs', '/manuals/v0.14.0/']) {
    const processor = await createMarkdownProcessor({ syntaxHighlight: false, smartypants: false, remarkPlugins: [[publicImages, { base, docsRoot }]] });
    const result = await processor.render(markdown, { fileURL: pathToFileURL(path.join(docsRoot, 'guides/example.md')) });
    assert.deepEqual(result.metadata.localImagePaths, []);
    assert.ok(result.code.includes(`src="${base.replace(/\/$/, '')}/images/panel%20detail.png"`), result.code);
    assert.ok(result.code.includes('alt="Panel controls."'));
    assert.ok(result.code.includes('title="Source controls"'));
    assert.ok(result.code.includes('href="../../examples/patch.hxc"'));
    assert.equal((result.code.match(/<a\b[^>]*\bdownload(?:[ =]|>)/g) ?? []).length, 2, 'inline and reference patch links must download even when the host omits a MIME type');
  }
});
