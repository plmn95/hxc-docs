import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test, mock } from 'node:test';
import { archiveRequest, onlineArchiveHtml, onlineArchiveSitemap, serveArchive } from '../src/lib/archive-online.mjs';
import { GET, HEAD } from '../api/archive.js';

const request = (path, method = 'GET') => new Request(`https://preview.example/api/archive?archivePath=${encodeURIComponent(path)}`, { method });
const fixture = (name) => readFileSync(new URL(`fixtures/archive/${name}`, import.meta.url), 'utf8');

test('archive route fixes the upstream origin and normalizes directory/index routes', () => {
  const route = archiveRequest(request('v0.19.1/reference/modules/isf/'));
  assert.equal(route.upstream, 'https://plmn95.github.io/hxc-docs/releases/v0.19.1/reference/modules/isf/index.html');
  assert.equal(route.canonical, 'https://docs.hexcomposer.com/vizard-docs/releases/v0.19.1/reference/modules/isf/');
  assert.equal(archiveRequest(request('v0.15.0/')).page, '');
  assert.equal(archiveRequest(request('v0.19.1/reference/modules/isf/index.html')).canonical, route.canonical);
});

test('archive route rejects ambiguous parameters, traversal, arbitrary hosts and asset requests', () => {
  for (const path of ['v0.19.1/../', 'v0.19.1/%2e%2e/', 'v0.19.1//', 'v0.19.1/\\evil/', 'https://example.com/', 'v0.19.1/_astro/test.js', 'v0.19.1', 'v0.19.1/hello.html', 'v0.19.1/<img>/']) assert.equal(archiveRequest(request(path)), null, path);
  assert.equal(archiveRequest(new Request('https://example.com/api/archive?archivePath=v0.19.1/&archivePath=v0.15.0/')), null);
  assert.equal(archiveRequest(new Request('https://example.com/api/archive')), null);
});

for (const [name, path] of [['v0.19.1-isf.html', 'v0.19.1/reference/modules/isf/'], ['v0.15.0-index.html', 'v0.15.0/']]) {
  test(`${name}: online metadata identifies the version and repairs its canonical/current link`, () => {
    const html = fixture(name), route = archiveRequest(request(path));
    const result = onlineArchiveHtml(html, route);
    assert.match(result, new RegExp(`<title>[^<]+ \\(${route.version.replaceAll('.', '\\.')} archive\\)</title>`));
    assert.ok(result.includes(`<link rel="canonical" href="${route.canonical}">`));
    assert.ok(result.includes(`<meta property="og:url" content="${route.canonical}">`));
    assert.ok(result.includes(`content="Archived manual for ${route.version}. `));
    assert.ok(result.includes(`href="https://docs.hexcomposer.com/${route.page}?manual=${route.version}"`));
    assert.equal(result.slice(result.indexOf('<main>')), html.slice(html.indexOf('<main>')), 'article and scripts are byte-identical');
    assert.ok(html.includes('https://plmn95.github.io/vizard-docs/'), 'source fixture remains frozen');
  });
}

test('parser handles reordered attributes, HTML entities, absent/duplicate canonicals without touching article links', () => {
  const route = archiveRequest(request('v1.0.0/'));
  const html = '<!doctype html><html><head><title>A &amp; B</title><meta content="A &quot;quoted&quot; item" name="description"></head><body><a href="https://plmn95.github.io/vizard-docs/">old article link</a></body></html>';
  const result = onlineArchiveHtml(html, route);
  assert.ok(result.includes('<title>A &amp; B (v1.0.0 archive)</title>'));
  assert.ok(result.includes('A &quot;quoted&quot; item'));
  assert.equal(result.split('rel="canonical"').length - 1, 1);
  assert.equal(result.slice(result.indexOf('<body>')), html.slice(html.indexOf('<body>')));
  const duplicate = result.replace('</head>', '<link href="old" rel="canonical"></head>');
  assert.equal(onlineArchiveHtml(duplicate, route).split('rel="canonical"').length - 1, 1);
});

test('GET returns transformed HTML, correct cache/Link headers and HEAD omits the body', async () => {
  const fetchPage = async (url, options) => {
    assert.equal(url, 'https://plmn95.github.io/hxc-docs/releases/v0.19.1/reference/modules/isf/index.html');
    assert.equal(options.redirect, 'error');
    return new Response(fixture('v0.19.1-isf.html'), { headers: { 'content-type': 'text/html; charset=utf-8' } });
  };
  const response = await serveArchive(request('v0.19.1/reference/modules/isf/'), fetchPage);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Link'), '<https://docs.hexcomposer.com/vizard-docs/releases/v0.19.1/reference/modules/isf/>; rel="canonical"');
  assert.match(response.headers.get('CDN-Cache-Control'), /s-maxage=3600/);
  assert.match(await response.text(), /v0.19.1 archive/);
  assert.equal(await (await serveArchive(request('v0.19.1/reference/modules/isf/', 'HEAD'), fetchPage)).text(), '');
  const stub = mock.method(globalThis, 'fetch', fetchPage);
  try {
    assert.equal((await GET(request('v0.19.1/reference/modules/isf/'))).status, 200);
    assert.equal(await (await HEAD(request('v0.19.1/reference/modules/isf/', 'HEAD'))).text(), '');
  } finally { stub.mock.restore(); }
});

test('index URLs redirect to the public directory canonical without fetching', async () => {
  const response = await serveArchive(request('v0.19.1/reference/modules/isf/index.html'), () => { throw new Error('must not fetch'); });
  assert.equal(response.status, 308);
  assert.equal(response.headers.get('Location'), 'https://docs.hexcomposer.com/vizard-docs/releases/v0.19.1/reference/modules/isf/');
});

test('missing routes are 404 and upstream errors are uncached 502 responses', async () => {
  const response = await serveArchive(request('v0.19.1/missing/'), async () => new Response('Not found', { status: 404 }));
  assert.equal(response.status, 404);
  assert.equal(response.headers.get('X-Robots-Tag'), 'noindex');
  const originalError = console.error;
  console.error = () => {};
  try {
    for (const fetchPage of [async () => { throw new Error('timeout'); }, async () => new Response('error', { status: 503 }), async () => new Response('wrong type', { headers: { 'content-type': 'application/json' } })]) {
      const result = await serveArchive(request('v0.19.1/'), fetchPage);
      assert.equal(result.status, 502);
      assert.equal(result.headers.get('Cache-Control'), 'no-store');
    }
  } finally { console.error = originalError; }
});

test('HEAD error responses omit their body as well', async () => {
  assert.equal(await (await serveArchive(request('invalid', 'HEAD'))).text(), '');
  assert.equal(await (await serveArchive(request('v0.19.1/missing/', 'HEAD'), async () => new Response('', { status: 404 }))).text(), '');
  const originalError = console.error;
  console.error = () => {};
  try {
    assert.equal(await (await serveArchive(request('v0.19.1/', 'HEAD'), async () => { throw new Error('offline'); })).text(), '');
  } finally { console.error = originalError; }
});

test('online sitemap index and URL entries use the same public version canonical', async () => {
  const route = archiveRequest(request('v0.19.1/sitemap-index.xml'));
  assert.equal(route.kind, 'sitemap');
  assert.equal(archiveRequest(request('v0.15.0/sitemap.xml')).kind, 'sitemap');
  assert.equal(route.upstream, 'https://plmn95.github.io/hxc-docs/releases/v0.19.1/sitemap-index.xml');
  const xml = '<?xml version="1.0"?><sitemapindex><sitemap><loc>https://plmn95.github.io/vizard-docs/releases/v0.19.1/sitemap-0.xml</loc></sitemap></sitemapindex>';
  assert.equal(onlineArchiveSitemap(xml, route), xml.replace('https://plmn95.github.io/vizard-docs', 'https://docs.hexcomposer.com/vizard-docs'));
  const other = '<urlset><url><loc>https://plmn95.github.io/hxc-docs/releases/v0.19.1/reference/modules/isf/</loc></url><url><loc>https://example.org/</loc></url></urlset>';
  assert.equal(onlineArchiveSitemap(other, route), other.replace('https://plmn95.github.io/hxc-docs', 'https://docs.hexcomposer.com/vizard-docs'));
  const response = await serveArchive(request('v0.19.1/sitemap-0.xml'), async () => new Response(xml, { headers: { 'content-type': 'application/xml' } }));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Content-Type'), 'application/xml; charset=utf-8');
  assert.ok((await response.text()).includes('https://docs.hexcomposer.com/vizard-docs/releases/v0.19.1/sitemap-0.xml'));
  for (const path of ['v0.19.1/reference/sitemap-0.xml', 'v0.19.1/sitemap-evil.xml', 'v0.19.1/arbitrary.xml']) assert.equal(archiveRequest(request(path)), null);
});

test('the online versions chooser link is repaired outside the frozen article', () => {
  const html = '<html><head><title>Vizard</title></head><body><main>Unchanged article</main><div class="manual-links astro-ole6w4rf" data-pagefind-ignore><a href="https://plmn95.github.io/vizard-docs/versions/" class="astro-ole6w4rf">Documentation versions (online)</a></div></body></html>';
  const result = onlineArchiveHtml(html, archiveRequest(request('v0.15.0/')));
  assert.ok(result.includes('<main>Unchanged article</main>'));
  assert.ok(result.includes('href="https://docs.hexcomposer.com/versions/" class="astro-ole6w4rf">Documentation versions (online)</a>'));
});
