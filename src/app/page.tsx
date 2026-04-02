"use client";

import React, { useRef, useState, useEffect, FormEvent } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import NeuralBackground from "@/components/ui/flow-field-background";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import {
  ArrowDown,
  Camera,
  Palette,
  Film,
  Sparkles,
  ArrowUpRight,
  Users,
  Clock,
  Briefcase,
  Award,
  Layers,
  Pen,
  Monitor,
  Aperture,
  Wand2,
  MousePointer2,
  Quote,
  Send,
  Mail,
  CheckCircle,
  Loader2,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */

const CLIENTS = [
  "Tata Motors",
  "Macmillan Publishers",
  "Amar Ujala",
  "Magicrete",
  "Via Airlines",
  "Trust Health Care",
  "SBS University",
  "Selzer",
  "Aisen Solar",
  "Furrsured",
  "Fiery Pot Foods",
  "LLCTen10 Cricket",
  "GetMyRugs",
  "Boyner Shoes",
];

const SKILLS = [
  { icon: Palette, label: "Graphic Design", desc: "Ads, packaging, social media creatives" },
  { icon: Film, label: "Video Editing", desc: "Promos, reels, brand films" },
  { icon: Camera, label: "Photography", desc: "Product & lifestyle shoots" },
  { icon: Sparkles, label: "Visual Storytelling", desc: "End-to-end brand narratives" },
];

const STATS = [
  { value: "3+", label: "Years of\nExperience", icon: Clock },
  { value: "20+", label: "Clients\nServed", icon: Users },
  { value: "100+", label: "Creatives\nDelivered", icon: Briefcase },
  { value: "5+", label: "Industries\nCovered", icon: Award },
];

const TOOLS = [
  { name: "Photoshop", icon: Layers, color: "#31A8FF" },
  { name: "Illustrator", icon: Pen, color: "#FF9A00" },
  { name: "After Effects", icon: Wand2, color: "#9999FF" },
  { name: "Premiere Pro", icon: Film, color: "#9999FF" },
  { name: "Lightroom", icon: Aperture, color: "#31A8FF" },
  { name: "C++", icon: Monitor, color: "#00599C" },
  { name: "Canva", icon: Palette, color: "#00C4CC" },
  { name: "Python", icon: MousePointer2, color: "#3776AB" },
];

const EXPERIENCE = [
  {
    period: "Oct. 2023 — Dec. 2025",
    role: "Graphic Designer & Video Editor",
    company: "Monkey Minds",
    desc: "Working as a full-time graphic designer and video editor, specializing in creating visually compelling content for a diverse range of clients.",
  },
  {
    period: "2022 — 2023",
    role: "Graphic Designer / Video Editor",
    company: "Raw Leaf Story",
    desc: "Freelanced as a graphic designer and video editor during their festive campaign.",
  },
  {
    period: "2021 — 2023",
    role: "Graphic Designer & Video Editor",
    company: "Kiddy Buddy",
    desc: "Worked as a graphic designer and video editor at a burgeoning fashion brand startup.",
  },
];

const PHILOSOPHY_WORDS = [
  "Every pixel has purpose.",
  "Design is thinking made visual.",
  "Simplicity is the ultimate sophistication.",
  "Good design is invisible.",
];

/* ═══════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ═══════════════════════════════════════════════════════
   FLOATING ORBS — subtle 2D background animations
   ═══════════════════════════════════════════════════════ */
function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="floating-orb floating-orb-1" style={{ top: "10%", left: "15%" }} />
      <div className="floating-orb floating-orb-2" style={{ top: "50%", right: "10%" }} />
      <div className="floating-orb floating-orb-3" style={{ bottom: "15%", left: "40%" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION WRAPPER
   ═══════════════════════════════════════════════════════ */
function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id={id}
      ref={ref}
      className={`relative z-10 ${className}`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {children}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${scrolled ? "py-3 backdrop-blur-2xl bg-black/50 border-b border-white/[0.03]" : "py-5"
        }`}
    >
      <div className="glass rounded-full px-5 py-2">
        <span className="text-xs font-bold tracking-[0.25em] uppercase text-white/90">
          R. Daksh
        </span>
      </div>
      <div className="hidden md:flex glass rounded-full px-2 py-1.5 gap-0.5">
        {["About", "Work", "Experience", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="px-4 py-1.5 text-xs font-medium text-white/45 hover:text-white hover:bg-white/5 rounded-full transition-all duration-300"
          >
            {item}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════════════
   ROTATING PHILOSOPHY QUOTE
   ═══════════════════════════════════════════════════════ */
function RotatingQuote() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PHILOSOPHY_WORDS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[100px] md:h-[140px] flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -40, filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-2xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center absolute gradient-text leading-tight px-4"
        >
          {PHILOSOPHY_WORDS[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CONTACT SECTION — EmailJS
   ═══════════════════════════════════════════════════════ */
function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setSending(true);
    setError("");

    try {
      await emailjs.sendForm(
        "daksh_service",     // service ID
        "contactme",         // template ID
        formRef.current,
        "xEpMe5qZNVC1zw2XV"  // public key
      );
      setSent(true);
      formRef.current.reset();
      setTimeout(() => setSent(false), 5000);
    } catch {
      setError("Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <footer id="contact" className="relative z-10">
      <div className="section-line" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-28 md:py-40">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.4em] uppercase text-indigo-400 mb-6 font-medium">
            Get in Touch
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">
            Let&apos;s create
            <br />
            <span className="gradient-text">something great.</span>
          </h2>
          <p className="text-white/20 max-w-sm mx-auto text-sm leading-relaxed">
            Open for freelance projects, collaborations, and full-time
            opportunities.
          </p>
        </div>

        {/* Form */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="glass rounded-3xl p-8 md:p-12 space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/30 mb-3 font-medium">
                Your Name
              </label>
              <input
                type="text"
                name="from_name"
                required
                placeholder="John Doe"
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-indigo-400/40 focus:bg-white/[0.05] transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/30 mb-3 font-medium">
                Email Address
              </label>
              <input
                type="email"
                name="from_email"
                required
                placeholder="john@example.com"
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-indigo-400/40 focus:bg-white/[0.05] transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-white/30 mb-3 font-medium">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tell me about your project..."
              className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-indigo-400/40 focus:bg-white/[0.05] transition-all duration-300 resize-none"
            />
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-400/80 text-xs font-medium">{error}</p>
          )}

          {/* Submit button */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-white/15">
              <Mail className="w-4 h-4" />
              <span className="text-[10px] tracking-widest uppercase">Powered by EmailJS</span>
            </div>

            <button
              type="submit"
              disabled={sending || sent}
              className="group flex items-center gap-3 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] hover:border-indigo-400/30 rounded-full px-7 py-3 text-sm font-medium text-white/80 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sent ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Sent!
                </>
              ) : sending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <main className="bg-[#050505] text-white noise-overlay relative">
      {/* Background floating orbs — subtle 2D ambient animation */}
      <FloatingOrbs />

      <Navbar />

      {/* ═══════════════════════════════════════════════
          HERO
         ═══════════════════════════════════════════════ */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative w-full h-screen bg-black z-10"
      >
        <NeuralBackground
          color="#818cf8"
          trailOpacity={0.08}
          particleCount={700}
          speed={0.6}
        />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(129,140,248,0.12),transparent_60%)] z-[2] pointer-events-none" />

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-8"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl shadow-indigo-500/20 mx-auto ring-1 ring-indigo-500/10 ring-offset-4 ring-offset-black">
              <Image
                src="/daksh.jpeg"
                alt="R. Daksh"
                width={128}
                height={128}
                className="w-full h-full object-cover object-top scale-110"
                priority
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-indigo-300/50 mb-6 font-medium"
          >
            Creative Designer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-7xl md:text-[9rem] font-black leading-[0.85] tracking-tighter text-center"
          >
            <span className="gradient-text">R. Daksh</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-8 text-sm md:text-base text-white/25 max-w-md text-center leading-relaxed tracking-wide"
          >
            Graphic Design · Video Editing · Photography · Visual&nbsp;Storytelling
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-20 pointer-events-auto"
          >
            <a href="#stats" className="flex flex-col items-center gap-2 group">
              <span className="text-[9px] tracking-[0.3em] uppercase text-white/15 group-hover:text-white/40 transition">
                Explore
              </span>
              <ArrowDown className="w-4 h-4 text-white/10 group-hover:text-indigo-400 transition animate-bounce" />
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          STATS — Big, bold bento boxes
         ═══════════════════════════════════════════════ */}
      <Section id="stats" className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="glass rounded-3xl p-8 md:p-10 group hover:bg-white/[0.05] transition-all duration-500 relative overflow-hidden cursor-default"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(129,140,248,0.08),transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <stat.icon className="w-5 h-5 text-indigo-400/40 mb-6 group-hover:text-indigo-400/80 transition-colors duration-500" />

                <div className="text-5xl md:text-6xl font-black tracking-tight gradient-text mb-3 leading-none">
                  {stat.value}
                </div>

                <p className="text-[10px] md:text-[11px] text-white/30 tracking-[0.15em] uppercase font-medium leading-relaxed whitespace-pre-line">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════
          ABOUT + SKILLS
         ═══════════════════════════════════════════════ */}
      <Section id="about" className="py-24 md:py-40 px-6 md:px-12 grid-pattern">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.p variants={fadeUp} custom={0} className="text-[10px] tracking-[0.4em] uppercase text-indigo-400 mb-5 font-medium">
                About
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-8">
                Crafting visuals
                <br />
                <span className="text-white/15">that tell stories.</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-white/35 leading-[1.9] text-base">
                I&apos;m a creative designer specializing in advertisements,
                promotional videos, packaging, and social media creatives for
                brands across industries. I completed my BCA from{" "}
                <span className="text-white/80 font-medium">Jagannath Institute of Management &amp; Sciences</span>{" "}
                and worked at{" "}
                <span className="text-white/80 font-medium">Monkey Minds</span>{" "}
                until recently. I am now open to new opportunities to apply my
                creative and strategic skills.
              </motion.p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 gap-3 md:gap-4"
            >
              {SKILLS.map((skill, i) => (
                <motion.div
                  key={skill.label}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="glass rounded-2xl p-6 md:p-7 group hover:bg-white/[0.05] transition-all duration-500 cursor-default"
                >
                  <skill.icon className="w-5 h-5 text-indigo-400/70 mb-5 group-hover:scale-110 transition-transform" />
                  <h3 className="text-sm font-semibold text-white/85 mb-1.5">{skill.label}</h3>
                  <p className="text-[11px] text-white/25 leading-relaxed">{skill.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════
          CLIENT MARQUEE — single line, bright
         ═══════════════════════════════════════════════ */}
      <div className="py-10 md:py-14 overflow-hidden relative z-10">
        <div className="section-line mb-10" />
        <div className="animate-marquee flex whitespace-nowrap items-center">
          {[...CLIENTS, ...CLIENTS].map((client, i) => (
            <React.Fragment key={i}>
              <span className="text-sm md:text-base font-semibold text-white/80 hover:text-white transition-colors duration-500 cursor-default uppercase tracking-[0.2em]">
                {client}
              </span>
              <span className="mx-6 md:mx-10 text-white/25 text-lg select-none">·</span>
            </React.Fragment>
          ))}
        </div>
        <div className="section-line mt-10" />
      </div>

      {/* ═══════════════════════════════════════════════
          FEATURED WORK — scroll animation
         ═══════════════════════════════════════════════ */}
      <section id="work" className="relative z-10">
        <ContainerScroll
          titleComponent={
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-indigo-400 mb-4 font-medium">
                Featured Work
              </p>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                Selected <span className="gradient-text">Projects</span>
              </h2>
              <p className="mt-4 text-white/20 text-sm max-w-lg mx-auto leading-relaxed">
                Brand campaigns, advertisements, and creative design work
                delivered for top-tier clients.
              </p>
            </div>
          }
        >
          <div className="h-full w-full relative bg-zinc-950 grid grid-cols-2 md:grid-cols-3 gap-[1px] p-[1px]">
            {[
              { name: "Tata Motors", tag: "Brand Campaign", img: "/company_logo/tata.png", slug: "tata-motors" },
              { name: "Macmillan Kids Education", tag: "Visual Design", img: "/company_logo/macmillan.png", slug: "macmillan-kids-education" },
              { name: "Boyner / Gaitrix Shoes", tag: "Brand Identity", img: "/company_logo/boyner clinic.png", slug: "boyner-gaitrix-shoes" },
              { name: "Fiery Pot Foods", tag: "Packaging Design", img: "/company_logo/image.png", slug: "fiery-pot-foods" },
              { name: "Karara Jeera", tag: "Ad Campaign", img: "/company_logo/karara jeera.png", slug: "karara-jeera" },
              { name: "LLC Ten10", tag: "Creative Design", img: "/company_logo/LLCTEN10.png", slug: "llc-ten10" },
            ].map((project, i) => (
              <a key={i} href={`/project/${project.slug}`} className="relative group overflow-hidden bg-zinc-900 cursor-pointer flex flex-col items-center justify-center aspect-[3/2] no-underline">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(129,140,248,0.04),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Image
                  src={project.img}
                  alt={project.name}
                  width={600}
                  height={400}
                  className="w-3/4 h-3/4 object-contain opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 drop-shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 md:p-6">
                  <p className="text-[9px] tracking-[0.25em] uppercase text-indigo-300/50 mb-1 font-medium">
                    {project.tag}
                  </p>
                  <h3 className="text-sm md:text-base font-semibold text-white/90 flex items-center gap-1.5">
                    {project.name}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </ContainerScroll>
      </section>

      {/* ═══════════════════════════════════════════════
          CREATIVE PHILOSOPHY
         ═══════════════════════════════════════════════ */}
      <Section className="py-32 md:py-44 px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Quote className="w-8 h-8 text-indigo-400/15 mx-auto mb-10 rotate-180" />
            <RotatingQuote />
            <p className="mt-10 text-white/15 text-xs md:text-sm max-w-sm mx-auto leading-relaxed tracking-wide">
              My design philosophy — clean, intentional, and always in service of the brand&apos;s story.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════
          TOOLS & SOFTWARE
         ═══════════════════════════════════════════════ */}
      <Section className="py-24 md:py-36 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.p variants={fadeUp} custom={0} className="text-[10px] tracking-[0.4em] uppercase text-indigo-400 mb-4 font-medium text-center">
              Toolkit
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-bold tracking-tight mb-16 text-center">
              Software I <span className="text-white/15">master.</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {TOOLS.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="glass rounded-2xl p-6 md:p-7 group cursor-default relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(circle at 50% 40%, ${tool.color}0A, transparent 70%)`,
                  }}
                />
                <tool.icon
                  className="w-6 h-6 mb-4 transition-all duration-500 group-hover:scale-110"
                  style={{ color: `${tool.color}70` }}
                />
                <h3 className="text-sm font-semibold text-white/70 group-hover:text-white/95 transition-colors duration-500">
                  {tool.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════
          EXPERIENCE TIMELINE
         ═══════════════════════════════════════════════ */}
      <Section id="experience" className="py-28 md:py-40 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.p variants={fadeUp} custom={0} className="text-[10px] tracking-[0.4em] uppercase text-indigo-400 mb-4 font-medium">
              Experience
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-bold tracking-tight mb-16">
              Career <span className="text-white/15">Timeline</span>
            </motion.h2>

            <div>
              {EXPERIENCE.map((exp, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i + 2}
                  className="group grid md:grid-cols-[200px_1fr] gap-6 md:gap-16 py-10 border-t border-white/[0.04] hover:border-white/[0.08] transition-colors duration-500"
                >
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-white/20 font-medium">
                      {exp.period}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white/85 mb-1 group-hover:text-indigo-300 transition-colors duration-500">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-indigo-400/45 mb-3 font-medium">{exp.company}</p>
                    <p className="text-sm text-white/25 leading-relaxed max-w-lg">{exp.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════
          EDUCATION
         ═══════════════════════════════════════════════ */}
      <Section className="pb-28 md:pb-40 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="section-line mb-20" />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.p variants={fadeUp} custom={0} className="text-[10px] tracking-[0.4em] uppercase text-indigo-400 mb-4 font-medium">
              Education
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-bold tracking-tight mb-16">
              Academic <span className="text-white/15">Background</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-4">
              <motion.div variants={fadeUp} custom={2} whileHover={{ y: -4, transition: { duration: 0.3 } }} className="glass rounded-2xl p-8 md:p-10 group hover:bg-white/[0.04] transition-all duration-500 cursor-default">
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/15 mb-5 font-medium">Undergraduate</p>
                <h3 className="text-lg font-semibold text-white/85 mb-2">BCA — Bachelor of Computer Applications</h3>
                <p className="text-sm text-indigo-400/45 font-medium">Jagannath Institute of Management & Sciences</p>
              </motion.div>
              <motion.div variants={fadeUp} custom={3} whileHover={{ y: -4, transition: { duration: 0.3 } }} className="glass rounded-2xl p-8 md:p-10 group hover:bg-white/[0.04] transition-all duration-500 cursor-default">
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/15 mb-5 font-medium">Senior Secondary</p>
                <h3 className="text-lg font-semibold text-white/85 mb-2">Class XII</h3>
                <p className="text-sm text-indigo-400/45 font-medium">Apeejay School, Sheikh Sarai</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════
          CONTACT FORM
         ═══════════════════════════════════════════════ */}
      <ContactSection />

      {/* Bottom bar */}
      <div className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5 border-t border-white/[0.03] text-[10px] text-white/10 tracking-[0.15em] uppercase">
        <p>© {new Date().getFullYear()} R. Daksh</p>
        <p>Designed with passion</p>
      </div>
    </main>
  );
}
