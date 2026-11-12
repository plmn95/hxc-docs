import { parse } from 'parse5';

const origin = 'https://docs.hexcomposer.com';
const prefix = '/vizard-docs/releases/';
const mirror = 'https://plmn95.github.io/hxc-docs/releases/';
const versionPattern = /^v\d+\.\d+\.\d+(?:-[A-Za-z0-9.-]+)?$/;
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

// Never derive the upstream host or canonical origin from request headers.
export function archiveRequest(request) {
  const url = new URL(request.url);
  const paths = url.searchParams.getAll('archivePath');
  if (paths.length !== 1) return null;
  const path = paths[0];
  const [version, ...parts] = path.split('/');
  if (!versionPattern.test(version)) return null;
  if (parts.at(-1) === 'index.html') parts.pop();
  else if (parts.at(-1) === '') parts.pop();
  else return null;
  if (parts.some((part) => !/^[A-Za-z0-9_-]+$/.test(part))) return null;
  const page = parts.length ? `${parts.join('/')}/` : '';
  const canonical = `${origin}${prefix}${version}/${page}`;
  return { version, page, canonical, upstream: `${mirror}${version}/${page}index.html`, isIndex: path.endsWith('/index.html') };
}

// Patch only metadata and the existing current-manual link in the online response.
// Original ZIPs, manifests, article HTML, styles, search and media stay untouched.
export function onlineArchiveHtml(html, { version, page, canonical }) {
  const document = parse(html, { sourceCodeLocationInfo: true });
  const edits = [];
  const change = (node, value) => {
    if (node.sourceCodeLocation) edits.push({ start: node.sourceCodeLocation.startOffset, end: node.sourceCodeLocation.endOffset, value });
  };
  const attr = (node, name) => node.attrs?.find((item) => item.name === name)?.value;
  const text = (node) => (node.childNodes ?? []).map((child) => child.value ?? '').join('');
  let hasCanonical = false;
  let head;
  function visit(node, inNotice = false) {
    if (node.tagName === 'head') head = node;
    const notice = inNotice || (attr(node, 'class') ?? '').split(/\s+/).includes('archive-notice');
    if (node.tagName === 'title') change(node, `<title>${escape(text(node))} (${escape(version)} archive)</title>`);
    if (node.tagName === 'link' && attr(node, 'rel') === 'canonical') {
      change(node, hasCanonical ? '' : `<link rel="canonical" href="${escape(canonical)}">`);
      hasCanonical = true;
    }
    if (node.tagName === 'meta') {
      const key = attr(node, 'property') ?? attr(node, 'name');
      const value = attr(node, 'content') ?? '';
      if (key === 'og:url') change(node, `<meta property="og:url" content="${escape(canonical)}">`);
      if (key === 'og:title' || key === 'twitter:title') change(node, `<meta ${key.startsWith('og:') ? 'property' : 'name'}="${key}" content="${escape(value)} (${escape(version)} archive)">`);
      if (['description', 'og:description', 'twitter:description'].includes(key)) change(node, `<meta ${key.startsWith('og:') ? 'property' : 'name'}="${key}" content="Archived manual for ${escape(version)}. ${escape(value)}">`);
    }
    if (notice && node.tagName === 'a' && node.sourceCodeLocation?.attrs?.href) {
      const location = node.sourceCodeLocation.attrs.href;
      edits.push({ start: location.startOffset, end: location.endOffset,
        value: `href="${origin}/${page}?manual=${encodeURIComponent(version)}"` });
    }
    for (const child of node.childNodes ?? []) visit(child, notice);
  }
  visit(document);
  if (!hasCanonical && head?.sourceCodeLocation?.endTag) {
    const start = head.sourceCodeLocation.endTag.startOffset;
    edits.push({ start, end: start, value: `<link rel="canonical" href="${escape(canonical)}">` });
  }
  return edits.sort((a, b) => b.start - a.start).reduce((result, edit) => result.slice(0, edit.start) + edit.value + result.slice(edit.end), html);
}

export async function serveArchive(request, fetchPage = fetch) {
  const route = archiveRequest(request);
  if (!route) return new Response(request.method === 'HEAD' ? null : 'Manual page not found.', { status: 404, headers: { 'X-Robots-Tag': 'noindex' } });
  if (route.isIndex) return new Response(null, { status: 308, headers: { Location: route.canonical } });
  try {
    const response = await fetchPage(route.upstream, { redirect: 'error', signal: AbortSignal.timeout(10000) });
    if (response.status === 404) return new Response(request.method === 'HEAD' ? null : 'Manual page not found.', { status: 404, headers: { 'X-Robots-Tag': 'noindex' } });
    if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) throw new Error(`Unexpected archive response: ${response.status}`);
    const html = await response.text();
    const headers = {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'CDN-Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      Link: `<${route.canonical}>; rel="canonical"`,
    };
    return new Response(request.method === 'HEAD' ? null : onlineArchiveHtml(html, route), { headers });
  } catch (error) {
    console.error('Archived manual unavailable:', route.version, route.page, error.message);
    return new Response(request.method === 'HEAD' ? null : 'The archived manual is temporarily unavailable. Please try again later.', {
      status: 502, headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
    });
  }
}
