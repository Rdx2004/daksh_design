"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, X, ChevronLeft, ChevronRight, Play, Image as ImageIcon, Film } from "lucide-react";
import mediaManifest from "@/data/media-manifest.json";

/* ═══════════════════════════════════════════════════════
   PROJECT DATA MAP
   ═══════════════════════════════════════════════════════ */
const PROJECT_INFO: Record<string, { name: string; tag: string; description: string; logo: string }> = {
  "tata-motors": {
    name: "Tata Motors",
    tag: "Brand Campaign",
    description: "Brand campaigns, festive creatives, and promotional videos crafted for Tata Motors' commercial vehicle division.",
    logo: "/company_logo/tata.png",
  },
  "macmillan-kids-education": {
    name: "Macmillan Kids Education",
    tag: "Visual Design",
    description: "Educational content design, social media reels, and promotional materials for Macmillan's kids education vertical.",
    logo: "/company_logo/macmillan.png",
  },
  "boyner-gaitrix-shoes": {
    name: "Boyner / Gaitrix Shoes",
    tag: "Brand Identity",
    description: "Brand identity, product showcases, and dynamic promotional videos for Boyner and Gaitrix footwear brands.",
    logo: "/company_logo/boyner clinic.png",
  },
  "fiery-pot-foods": {
    name: "Fiery Pot Foods",
    tag: "Packaging Design",
    description: "Packaging design, social media creatives, and brand campaign materials for a food & beverage brand.",
    logo: "/company_logo/image.png",
  },
  "karara-jeera": {
    name: "Karara Jeera",
    tag: "Ad Campaign",
    description: "Advertisement campaigns and engaging social media reels for Karara Jeera's beverage brand.",
    logo: "/company_logo/karara jeera.png",
  },
  "llc-ten10": {
    name: "LLC Ten10",
    tag: "Creative Design",
    description: "Tournament branding, event creatives, and highlight reels for LLC Ten10 cricket league.",
    logo: "/company_logo/LLCTEN10.png",
  },
};

type MediaItem = {
  name: string;
  type: "image" | "video";
  url: string;
};

/* ═══════════════════════════════════════════════════════
   LIGHTBOX COMPONENT
   ═══════════════════════════════════════════════════════ */
function Lightbox({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  items: MediaItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[currentIndex];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-[210] w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.12] transition-all duration-300"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[210] text-white/30 text-xs tracking-[0.2em] uppercase font-medium">
        {currentIndex + 1} / {items.length}
      </div>

      {/* Prev button */}
      {items.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 md:left-8 z-[210] w-12 h-12 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.1] transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next button */}
      {items.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 md:right-8 z-[210] w-12 h-12 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.1] transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Content */}
      <div className="max-w-[90vw] max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {item.type === "video" ? (
              <video
                src={item.url}
                controls
                autoPlay
                loop
                className="max-w-[90vw] max-h-[85vh] rounded-xl shadow-2xl"
              />
            ) : (
              <img
                src={item.url}
                alt={item.name}
                className="max-w-[90vw] max-h-[85vh] rounded-xl shadow-2xl object-contain"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   PROJECT PAGE
   ═══════════════════════════════════════════════════════ */
export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const project = PROJECT_INFO[slug];

  const media: MediaItem[] = (mediaManifest as Record<string, MediaItem[]>)[slug] || [];
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project not found</h1>
          <button
            onClick={() => router.push("/")}
            className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" /> Back to portfolio
          </button>
        </div>
      </div>
    );
  }

  const filtered = filter === "all" ? media : media.filter((m) => m.type === filter);
  const imageCount = media.filter((m) => m.type === "image").length;
  const videoCount = media.filter((m) => m.type === "video").length;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === 0 ? filtered.length - 1 : lightboxIndex - 1);
  };
  const nextLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === filtered.length - 1 ? 0 : lightboxIndex + 1);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white noise-overlay relative">
      {/* Floating background orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="floating-orb floating-orb-1" style={{ top: "10%", left: "15%" }} />
        <div className="floating-orb floating-orb-2" style={{ top: "50%", right: "10%" }} />
      </div>

      {/* ═══ HEADER ═══ */}
      <div className="relative z-10">
        {/* Top bar */}
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 backdrop-blur-2xl bg-black/50 border-b border-white/[0.03]"
        >
          <button
            onClick={() => router.push("/#work")}
            className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors duration-300"
          >
            <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.08] group-hover:border-indigo-400/30 transition-all duration-300">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-xs tracking-[0.2em] uppercase font-medium hidden md:block">Back to Portfolio</span>
          </button>

          <div className="glass rounded-full px-5 py-2">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-white/90">
              R. Daksh
            </span>
          </div>
        </motion.div>

        {/* Hero section */}
        <div className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12"
            >
              {/* Logo */}
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl glass p-4 flex items-center justify-center shrink-0">
                <Image
                  src={project.logo}
                  alt={project.name}
                  width={100}
                  height={100}
                  className="w-full h-full object-contain opacity-80"
                />
              </div>

              <div className="flex-1">
                <p className="text-[10px] tracking-[0.4em] uppercase text-indigo-400 mb-3 font-medium">
                  {project.tag}
                </p>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4">
                  <span className="gradient-text">{project.name}</span>
                </h1>
                <p className="text-white/30 text-base md:text-lg max-w-2xl leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>

            {/* Stats + Filter bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-12 md:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-white/[0.04] pt-8"
            >
              {/* Stats */}
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 text-white/25">
                  <ImageIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{imageCount} Images</span>
                </div>
                <div className="flex items-center gap-2 text-white/25">
                  <Film className="w-4 h-4" />
                  <span className="text-sm font-medium">{videoCount} Videos</span>
                </div>
                <div className="text-white/10 text-sm">{media.length} Total</div>
              </div>

              {/* Filter buttons */}
              <div className="flex items-center glass rounded-full p-1 gap-0.5">
                {(["all", "image", "video"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-5 py-2 text-xs font-medium tracking-[0.1em] uppercase rounded-full transition-all duration-300 ${
                      filter === f
                        ? "bg-white/[0.08] text-white border border-white/[0.08]"
                        : "text-white/30 hover:text-white/60"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══ GALLERY GRID ═══ */}
      <div className="relative z-10 px-6 md:px-12 pb-28">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-32 text-white/20">
              <p className="text-lg">No {filter !== "all" ? filter + "s" : "media"} found</p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((item, i) => (
                  <motion.div
                    key={item.url}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      delay: i * 0.04,
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      layout: { duration: 0.4 },
                    }}
                    onClick={() => openLightbox(i)}
                    className="group relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] cursor-pointer transition-all duration-500"
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(129,140,248,0.06),transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />

                    {item.type === "video" ? (
                      <div className="relative aspect-[4/3]">
                        <video
                          src={item.url}
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                          onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                          onMouseLeave={(e) => { const v = e.target as HTMLVideoElement; v.pause(); v.currentTime = 0; }}
                        />
                        {/* Video play badge */}
                        <div className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                          <Play className="w-3.5 h-3.5 text-white/70 fill-white/70" />
                        </div>
                        {/* Bottom gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      </div>
                    ) : (
                      <div className="relative aspect-[4/3]">
                        <img
                          src={item.url}
                          alt={item.name}
                          loading="lazy"
                          className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                        {/* Bottom gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      </div>
                    )}

                    {/* Hover expand indicator */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 z-20">
                      <span className="text-[9px] tracking-[0.2em] uppercase text-white/50 font-medium truncate max-w-[70%]">
                        {item.name}
                      </span>
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                        {item.type === "video" ? (
                          <Film className="w-3 h-3 text-white/60" />
                        ) : (
                          <ImageIcon className="w-3 h-3 text-white/60" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* ═══ LIGHTBOX ═══ */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={filtered}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevLightbox}
            onNext={nextLightbox}
          />
        )}
      </AnimatePresence>

      {/* Bottom bar */}
      <div className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5 border-t border-white/[0.03] text-[10px] text-white/10 tracking-[0.15em] uppercase">
        <p>© {new Date().getFullYear()} R. Daksh</p>
        <p>Designed with passion</p>
      </div>
    </main>
  );
}
