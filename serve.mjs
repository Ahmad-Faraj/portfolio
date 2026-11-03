#!/usr/bin/env node
/** Static file server for dist/. Node built-ins only. */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, resolve, normalize } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, 'dist');
const PORT = Number(process.env.PORT) || 4321;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.pdf': 'application/pdf',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
};

createServer(async (req, res) => {
  try {
    const url = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    // normalize() collapses any ../ before it can escape ROOT.
    let file = join(ROOT, normalize(url));
    if (!file.startsWith(ROOT)) return res.writeHead(403).end('Forbidden');

    const info = await stat(file).catch(() => null);
    if (info?.isDirectory()) file = join(file, 'index.html');

    const data = await readFile(file);
    res.writeHead(200, {
      'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<pre style="font:14px monospace;padding:24px">404, not found\n\n<a href="/">index</a></pre>');
  }
}).listen(PORT, () => {
  console.log(`\n  serving dist/ → http://localhost:${PORT}/\n`);
  console.log(`    /      all five, side by side`);
  console.log(`    /v1/   Morris          /v2/   Kernighan`);
  console.log(`    /v3/   Stroustrup      /v4/   Faculty`);
  console.log(`    /v5/   Sidebar         /v6/   arXiv\n`);
});
