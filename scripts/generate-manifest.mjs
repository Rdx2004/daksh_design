import fs from "fs";
import path from "path";

const STATIC_DIR = path.join(process.cwd(), "static");
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

const manifest = {};

for (const [folderName, slug] of Object.entries(PROJECT_MAP)) {
  const folderPath = path.join(STATIC_DIR, folderName);
  if (!fs.existsSync(folderPath)) {
    console.log(`Skipping: ${folderName}`);
    continue;
  }

  const files = fs.readdirSync(folderPath);
  manifest[slug] = [];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    let type = null;
    if (IMAGE_EXTS.includes(ext)) type = "image";
    else if (VIDEO_EXTS.includes(ext)) type = "video";
    if (!type) continue;

    const cleanName = file.replace(/\.[^.]+$/, "").replace(/\(\d+\)/g, "").trim();
    const url = `/projects/${encodeURIComponent(folderName)}/${encodeURIComponent(file)}`;

    manifest[slug].push({ name: cleanName, type, url });
  }

  console.log(`${folderName}: ${manifest[slug].length} files`);
}

const outDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));
console.log(`\nManifest saved to: ${OUTPUT_FILE}`);
