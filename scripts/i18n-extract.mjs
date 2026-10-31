#!/usr/bin/env node
// Lists every English string the site translates, so i18n/{fr,de,es}.json can be kept complete.
//   node --experimental-strip-types scripts/i18n-extract.mjs         write i18n/strings.json + i18n/client-keys.json
//   node --experimental-strip-types scripts/i18n-extract.mjs check   exit 1 if any locale is missing a string
// Sources: t('…') and msg('…') calls in the code, and every visible string in /data and config/site.ts
// (fields listed in SKIP_KEYS are identifiers and are left alone).
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { SKIP_KEYS } = await import(pathToFileURL(join(ROOT, 'lib/i18n/config.ts')));
const keys = new Set();
const client = new Set();

const walkDir = (d) =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? walkDir(p) : /\.(tsx?|mjs)$/.test(f) ? [p] : [];
  });

const unescape = (s) => s.replace(/\\(['"`\\])/g, '$1').replace(/\\n/g, '\n');
const CALL = /\b(?:t|msg)\(\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"|`((?:[^`\\$]|\\.)*)`)/g;
for (const dir of ['app', 'components', 'lib', 'config']) {
  for (const f of walkDir(join(ROOT, dir))) {
    const src = readFileSync(f, 'utf8');
    const isClient = /^\s*['"]use client['"]/.test(src);
    for (const m of src.matchAll(CALL)) {
      const k = unescape(m[1] ?? m[2] ?? m[3]);
      if (!/\p{L}/u.test(k)) continue;
      keys.add(k);
      if (isClient) client.add(k);
    }
  }
}

function collect(v, key, into = []) {
  if (typeof v === 'string') {
    if ((!key || !SKIP_KEYS.has(key)) && /\p{L}/u.test(v) && !/^(https?:|\/)/.test(v)) into.push(v);
  } else if (Array.isArray(v)) v.forEach((x) => collect(x, key, into));
  else if (v && Object.getPrototypeOf(v) === Object.prototype && !(key && SKIP_KEYS.has(key))) for (const [k, x] of Object.entries(v)) collect(x, k, into);
  return into;
}

const dataFiles = readdirSync(join(ROOT, 'data')).filter((f) => f.endsWith('.ts') && f !== 'types.ts');
for (const f of [...dataFiles.map((f) => `data/${f}`), 'config/site.ts', 'lib/stay.ts', 'lib/enquiry.ts']) {
  const mod = await import(pathToFileURL(join(ROOT, f)));
  for (const [name, v] of Object.entries(mod)) {
    if (typeof v === 'function') continue;
    if (f === 'lib/enquiry.ts' && !['interests', 'paces', 'stayStyles'].includes(name)) continue;
    if (f === 'data/photos.ts') {
      // Photo alt text is rendered by the (client) Media component.
      for (const p of Object.values(v)) if (p && p.alt) (keys.add(p.alt), client.add(p.alt));
      continue;
    }
    const strings = collect(v);
    for (const s of strings) keys.add(s);
    if (f === 'lib/stay.ts' || f === 'lib/enquiry.ts') strings.forEach((s) => client.add(s));
    if (f === 'data/seasons.ts' && name === 'microSeasons') v.forEach((s) => client.add(s.en));
    if (f === 'config/site.ts') strings.forEach((s) => client.add(s));
  }
}
for (const s of JSON.parse(readFileSync(join(ROOT, 'i18n/extra-keys.json'), 'utf8'))) keys.add(s);

// Strings that are the same in every language.
const keep = new Set(JSON.parse(readFileSync(join(ROOT, 'i18n/keep.json'), 'utf8')));
const all = [...keys].filter((k) => !keep.has(k)).sort();
const clientKeys = [...client].filter((k) => keys.has(k) && !keep.has(k)).sort();

if (process.argv[2] === 'check') {
  let bad = 0;
  for (const l of ['fr', 'de', 'es']) {
    const f = join(ROOT, `i18n/${l}.json`);
    const d = existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : {};
    const missing = all.filter((k) => !d[k]);
    if (missing.length) {
      bad++;
      console.log(`${l}: ${missing.length} missing`, missing.slice(0, 5));
    }
  }
  if (bad) process.exit(1);
  console.log(`i18n: all ${all.length} strings translated in fr, de, es`);
} else {
  writeFileSync(join(ROOT, 'i18n/strings.json'), JSON.stringify(all, null, 1) + '\n');
  writeFileSync(join(ROOT, 'i18n/client-keys.json'), JSON.stringify(clientKeys, null, 1) + '\n');
  console.log(`${all.length} strings (${clientKeys.length} used by client components)`);
}
