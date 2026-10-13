"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, GitBranch } from "lucide-react";
import { ease } from "../ui";
import LocalTime from "../LocalTime";

const headline = ["Amineos", "builds", "apps", "for", "phones,", "browsers", "and", "the", "servers", "behind", "them."];

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "0.6em", filter: "blur(8px)" },
  show: { opacity: 1, y: "0em", filter: "blur(0px)", transition: { duration: 0.8, ease } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const commands = [
  { cmd: "flutter run --release", out: "✓ Built for Android, iOS and web" },
  { cmd: "docker compose up -d", out: "✓ 11 services running" },
  { cmd: "nginx -t && systemctl reload nginx", out: "✓ Config OK, reloaded" },
];

function Terminal() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-neutral-950 font-mono text-xs shadow-2xl shadow-black/60">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 text-neutral-500">amineos@vps ~</span>
      </div>
      <div className="space-y-4 p-5 leading-relaxed">
        {commands.map((c, i) => (
          <motion.div
            key={c.cmd}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 + i * 1.1, duration: 0.3 }}
          >
            <p className="text-neutral-300">
              <span className="text-emerald-400">$</span> {c.cmd}
            </p>
            <p className="text-neutral-500">{c.out}</p>
          </motion.div>
        ))}
        <p className="text-neutral-300">
          <span className="text-emerald-400">$</span> <span className="caret inline-block h-3.5 w-1.5 translate-y-0.5 bg-neutral-300" />
        </p>
      </div>
      <div className="flex items-center justify-between border-t border-white/10 px-5 py-2.5 text-neutral-500">
        <span>Tunis</span>
        <LocalTime />
      </div>
    </div>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-24 md:px-8">
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
        className="grid-lines pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[48rem] -translate-x-1/2 rounded-full bg-white/[0.035] blur-3xl"
      />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.div initial="hidden" animate="show" variants={fade} transition={{ delay: 0.05 }} className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-neutral-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Open to remote work
            </span>
          </motion.div>

          <h1 className="mb-8 text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl">
            {headline.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span variants={wordVariants} initial="hidden" animate="show" transition={{ delay: 0.1 + i * 0.06 }} className="mr-[0.22em] inline-block">
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p initial="hidden" animate="show" variants={fade} transition={{ delay: 0.8 }} className="mb-10 max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
            Flutter and full-stack developer in Tunisia. Mobile apps, web apps, backends, and the VPS they run on.
          </motion.p>

          <motion.div initial="hidden" animate="show" variants={fade} transition={{ delay: 0.95 }} className="flex flex-col gap-3 sm:flex-row">
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
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease }} className="hidden lg:block">
          <Terminal />
        </motion.div>
      </motion.div>
    </section>
  );
}
