"use client";

import { motion, useScroll, type Variants } from "framer-motion";

export const ease = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

/** Fades its children up into place, one after another, the first time they scroll into view. */
export function Reveal({ children, className, as = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "ul" }) {
  const Tag = as === "ul" ? motion.ul : motion.div;
  return (
    <Tag
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: 0.06 }}
      className={className}
    >
      {children}
    </Tag>
  );
}

export function SectionHeader({ index, label, title, intro }: { index: string; label: string; title: string; intro?: string }) {
  return (
    <Reveal className="mb-14">
      <motion.p variants={fadeUp} className="mb-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
        {index} / {label}
      </motion.p>
      <motion.h2 variants={fadeUp} className="text-4xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
        {title}
      </motion.h2>
      {intro && (
        <motion.p variants={fadeUp} className="mt-4 max-w-lg text-neutral-400">
          {intro}
        </motion.p>
      )}
    </Reveal>
  );
}

export function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`scroll-mt-16 border-t border-white/10 ${className}`}>
      <div className="mx-auto max-w-6xl px-6 py-28 md:px-8">{children}</div>
    </section>
  );
}

/** A card whose border and background glow follow the cursor. */
export function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className={`spotlight group relative overflow-hidden rounded-xl border border-white/10 bg-neutral-950 transition-colors duration-300 hover:border-white/25 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.08), transparent 60%)" }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/** Thin bar at the top of the page showing how far the visitor has scrolled. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-[60] h-px bg-white/70"
    />
  );
}
