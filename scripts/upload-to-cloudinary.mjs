/**
 * ═══════════════════════════════════════════════════════
 * CLOUDINARY UPLOAD SCRIPT
 * ═══════════════════════════════════════════════════════
 * 
 * Uploads all project media from static/ to Cloudinary
 * and generates a media manifest JSON file.
 * 
 * SETUP:
 * 1. Create a FREE Cloudinary account at https://cloudinary.com
 * 2. Go to Dashboard → copy your Cloud Name, API Key, API Secret
 * 3. Create a .env.local file in the project root:
 *      CLOUDINARY_CLOUD_NAME=your_cloud_name
 *      CLOUDINARY_API_KEY=your_api_key
 *      CLOUDINARY_API_SECRET=your_api_secret
 * 4. Run: npm install cloudinary dotenv
 * 5. Run: node scripts/upload-to-cloudinary.mjs
 * 
 * This will upload all media and generate src/data/media-manifest.json
 */

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { config } from "dotenv";

// Load env
config({ path: ".env.local" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const STATIC_DIR = path.join(process.cwd(), "public", "projects");
const OUTPUT_FILE = path.join(process.cwd(), "src", "data", "media-manifest.json");

const PROJECT_MAP = {
  "Tata Motors": "tata-motors",
  "Macmillan Education": "macmillan-kids-education",
  "Boyner-Gaitrix shoes": "boyner-gaitrix-shoes",
  "Fiery pot foods": "fiery-pot-foods",
  "karara jeera": "karara-jeera",
  "LLC Ten10": "llc-ten10",
};

const IMAGE_EXTS = [".png", ".jpg", ".jpeg", ".webp", ".gif"];
const VIDEO_EXTS = [".mp4", ".webm", ".mov"];

function getMediaType(filename) {
  const ext = path.extname(filename).toLowerCase();
  if (IMAGE_EXTS.includes(ext)) return "image";
  if (VIDEO_EXTS.includes(ext)) return "video";
  return null;
}

async function uploadFile(filePath, folder) {
  const ext = path.extname(filePath).toLowerCase();
  const isVideo = VIDEO_EXTS.includes(ext);

  const result = await cloudinary.uploader.upload(filePath, {
    folder: `daksh-portfolio/${folder}`,
    resource_type: isVideo ? "video" : "image",
    use_filename: true,
    unique_filename: true,
    overwrite: false,
    // Auto-optimize images
    ...(isVideo
      ? { eager: [{ quality: "auto", fetch_format: "mp4" }] }
      : { quality: "auto", fetch_format: "auto" }),
  });

  return result.secure_url;
}

async function main() {
  console.log("🚀 Starting Cloudinary upload...\n");

  const manifest = {};

  for (const [folderName, slug] of Object.entries(PROJECT_MAP)) {
    const folderPath = path.join(STATIC_DIR, folderName);

    if (!fs.existsSync(folderPath)) {
      console.log(`⚠️  Folder not found: ${folderName}, skipping...`);
      continue;
    }

    console.log(`📁 Processing: ${folderName}`);
    const files = fs.readdirSync(folderPath);
    manifest[slug] = [];

    for (const file of files) {
      const mediaType = getMediaType(file);
      if (!mediaType) continue;

      const filePath = path.join(folderPath, file);
      const cleanName = file.replace(/\.[^.]+$/, "").replace(/\(\d+\)/g, "").trim();

      console.log(`   ⬆️  Uploading: ${file}...`);

      try {
        const url = await uploadFile(filePath, slug);
        manifest[slug].push({
          name: cleanName,
          type: mediaType,
          url: url,
        });
        console.log(`   ✅ Done: ${file}`);
      } catch (err) {
        console.error(`   ❌ Failed: ${file} — ${err.message}`);
      }
    }

    console.log(`   📊 ${manifest[slug].length} files uploaded for ${folderName}\n`);
  }

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));
  console.log(`\n✅ Manifest saved to: ${OUTPUT_FILE}`);
  console.log("🎉 All uploads complete! You can now deploy to Vercel.");
}

main().catch(console.error);
