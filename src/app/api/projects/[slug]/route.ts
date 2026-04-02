import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PROJECT_MAP: Record<string, string> = {
  "tata-motors": "Tata Motors",
  "macmillan-kids-education": "Macmillan Education",
  "boyner-gaitrix-shoes": "Boyner-Gaitrix shoes",
  "fiery-pot-foods": "Fiery pot foods",
  "karara-jeera": "karara jeera",
  "llc-ten10": "LLC Ten10",
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const folderName = PROJECT_MAP[slug];

  if (!folderName) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const projectDir = path.join(process.cwd(), "public", "projects", folderName);

  if (!fs.existsSync(projectDir)) {
    return NextResponse.json({ error: "Project folder not found" }, { status: 404 });
  }

  const files = fs.readdirSync(projectDir);
  const media = files
    .filter((file) => {
      const ext = file.toLowerCase();
      return (
        ext.endsWith(".png") ||
        ext.endsWith(".jpg") ||
        ext.endsWith(".jpeg") ||
        ext.endsWith(".webp") ||
        ext.endsWith(".gif") ||
        ext.endsWith(".mp4") ||
        ext.endsWith(".webm") ||
        ext.endsWith(".mov")
      );
    })
    .map((file) => ({
      name: file,
      type: /\.(mp4|webm|mov)$/i.test(file) ? "video" : "image",
      url: `/projects/${encodeURIComponent(folderName)}/${encodeURIComponent(file)}`,
    }));

  return NextResponse.json({ media });
}
