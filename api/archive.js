import { serveArchive } from '../src/lib/archive-online.mjs';

export function GET(request) {
  return serveArchive(request);
}

export function HEAD(request) {
  return serveArchive(request);
}
