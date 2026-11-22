// News-image entry for 22 November 2026 (Node 22, standard library only).
//
// The poster itself is the entry.png shipped beside this file: a 1024x1024
// newspaper front page drawn in code (HTML/CSS/SVG, rendered once to PNG
// with headless Chromium while building the entry). This program's only job
// is to place that finished image at /output/entry.png, byte for byte.
//
// It takes no input, reads no clock and uses no randomness, so repeated runs
// always write identical bytes. Outside the grader's container,
// MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const destination = join(outDir, 'entry.png');

// Fail loudly rather than shipping a corrupt image: a PNG must start with
// its 8-byte signature. This keeps a bad build from ever reaching the judge.
const head = readFileSync(source).subarray(0, 8);
const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!head.equals(pngSignature)) throw new Error('entry.png is not a valid PNG');

mkdirSync(outDir, { recursive: true });
copyFileSync(source, destination);
