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

const stack = ["Next.js", "TypeScript", "PostgreSQL", "Docker", "Nginx"];

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16 text-center">
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="grid-lines pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-white/[0.04] blur-3xl"
      />

      <motion.div style={{ y, opacity }} variants={container} initial="hidden" animate="show" className="relative z-10 flex max-w-4xl flex-col items-center">
        <motion.div variants={item} className="mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-neutral-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Available for new projects
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mb-6 bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-transparent sm:text-6xl md:text-7xl"
        >
          I build web apps
          <br />
          and run the servers too.
        </motion.h1>

        <motion.p variants={item} className="mb-10 max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
          I&apos;m Amineos, a full-stack developer in Tunis. I write the frontend, the backend and the database, then
          deploy it all to a VPS I set up myself.
        </motion.p>

        <motion.div variants={item} className="mb-14 flex flex-col gap-3 sm:flex-row">
          <a
            href="#projects"
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
          >
            See my work
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

        <motion.ul variants={item} className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-xs text-neutral-500">
          {stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </motion.ul>
      </motion.div>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
