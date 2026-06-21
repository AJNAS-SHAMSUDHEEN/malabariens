/**
 * Upload WebP hero frames to Vercel Blob
 * Run: $env:BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xxx"; node scripts/upload-webp-to-blob.mjs
 */

import { put } from "@vercel/blob";
import { readFileSync, readdirSync } from "fs";
import { join, resolve } from "path";

const FRAMES_DIR = resolve("public/herosequences-webp");
const CONCURRENCY = 8;

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) {
  console.error("❌  Missing BLOB_READ_WRITE_TOKEN");
  process.exit(1);
}

const files = readdirSync(FRAMES_DIR)
  .filter(f => f.endsWith(".webp"))
  .sort();

console.log(`📦  Uploading ${files.length} WebP frames to Vercel Blob...\n`);

let done = 0;

async function uploadOne(filename) {
  const data = readFileSync(join(FRAMES_DIR, filename));
  const blob = await put(`herosequences-webp/${filename}`, data, {
    access: "public",
    token,
    contentType: "image/webp",
    cacheControlMaxAge: 31536000,
  });
  done++;
  const pct = Math.round((done / files.length) * 100);
  process.stdout.write(`\r  Uploading... ${pct}% (${done}/${files.length}) — ${filename}   `);
  return blob.url;
}

for (let i = 0; i < files.length; i += CONCURRENCY) {
  const batch = files.slice(i, i + CONCURRENCY).map(f => uploadOne(f));
  await Promise.all(batch);
}

const baseUrl = `https://02lrin0yndqag3mg.public.blob.vercel-storage.com/herosequences-webp/`;
console.log("\n\n✅  WebP frames uploaded!");
console.log(`📋  New BLOB_BASE_URL:\n    "${baseUrl}"`);
console.log(`\n🔥  Update HeroSection.tsx:`);
console.log(`    BLOB_BASE_URL = "${baseUrl}"`);
console.log(`    FRAME_PATH = (n) => \`\${BLOB_BASE_URL}ezgif-frame-\${String(n).padStart(3,"0")}.webp\``);
