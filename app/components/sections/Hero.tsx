"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, GitBranch } from "lucide-react";
import { ease } from "../ui";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease } },
};

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="hero" className="relative flex min-h-[90vh] items-center overflow-hidden px-6 pt-28 pb-20 md:px-8">
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="grid-lines pointer-events-none absolute inset-0"
      />

      <motion.div style={{ y, opacity }} variants={container} initial="hidden" animate="show" className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.div variants={item} className="mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-neutral-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Open to remote work
          </span>
        </motion.div>

        <motion.h1 variants={item} className="mb-6 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl">
          Amineos builds apps for phones, browsers and the servers behind them.
        </motion.h1>

        <motion.p variants={item} className="mb-10 max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
          Flutter and full-stack developer in Tunisia. Mobile apps, web apps, backends, and the VPS they run on.
        </motion.p>

        <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row">
          <a
            href="#work"
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
          >
            View my work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="https://github.com/aminegames125"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-white/15 px-5 text-sm font-medium text-white transition-colors hover:bg-white/[0.06]"
          >
            <GitBranch className="h-4 w-4" />
            GitHub
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
