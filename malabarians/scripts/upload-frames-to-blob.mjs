/**
 * Upload hero sequence frames to Vercel Blob
 * 
 * HOW TO GET YOUR TOKEN:
 * 1. Go to Vercel Dashboard → Storage → malabariens-x898-blob
 * 2. Click ".env.local" tab
 * 3. Copy the value of BLOB_READ_WRITE_TOKEN
 * 4. Run: $env:BLOB_READ_WRITE_TOKEN="your_token_here"
 * 5. Then: node scripts/upload-frames-to-blob.mjs
 */

import { put } from "@vercel/blob";
import { readFileSync, readdirSync } from "fs";
import { join, resolve } from "path";

const FRAMES_DIR = resolve("public/herosequences");
const CONCURRENCY = 5; // upload 5 at a time

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) {
  console.error("❌  Missing BLOB_READ_WRITE_TOKEN environment variable.");
  console.error("    Set it with: $env:BLOB_READ_WRITE_TOKEN=\"vercel_blob_rw_xxx\"");
  process.exit(1);
}

const files = readdirSync(FRAMES_DIR)
  .filter(f => f.endsWith(".png"))
  .sort();

console.log(`📦  Found ${files.length} frames to upload...\n`);

const results = [];
let done = 0;

async function uploadOne(filename) {
  const filepath = join(FRAMES_DIR, filename);
  const data = readFileSync(filepath);
  const blob = await put(`herosequences/${filename}`, data, {
    access: "public",
    token,
    contentType: "image/png",
    // Cache for 1 year — frames never change
    cacheControlMaxAge: 31536000,
  });
  done++;
  const pct = Math.round((done / files.length) * 100);
  process.stdout.write(`\r  Uploading... ${pct}% (${done}/${files.length}) — ${filename}   `);
  return { filename, url: blob.url };
}

// Upload in batches of CONCURRENCY
for (let i = 0; i < files.length; i += CONCURRENCY) {
  const batch = files.slice(i, i + CONCURRENCY).map(f => uploadOne(f));
  const batchResults = await Promise.all(batch);
  results.push(...batchResults);
}

console.log("\n\n✅  All frames uploaded!\n");
console.log("📋  Base URL (copy this):");
// All frames share the same base URL pattern — extract it
const firstUrl = results[0].url;
const baseUrl = firstUrl.replace("herosequences/ezgif-frame-001.png", "herosequences/");
console.log(`    ${baseUrl}\n`);

// Write URLs to a JSON file for reference
import { writeFileSync } from "fs";
writeFileSync(
  "scripts/blob-urls.json",
  JSON.stringify({ baseUrl, frames: results }, null, 2)
);
console.log("📄  Full URL list saved to: scripts/blob-urls.json");
console.log("\n🔥  Now update BLOB_BASE_URL in src/components/HeroSection.tsx");
console.log(`    BLOB_BASE_URL = "${baseUrl}"\n`);
