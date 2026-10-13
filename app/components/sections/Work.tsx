"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Section, SectionHeader, fadeUp } from "../ui";

// Public repos only. Private projects are left out on purpose.
const projects = [
  {
    name: "Veil",
    description: "Permission-gated passages between dimensions for Minecraft, built on Immersive Portals for Fabric 1.21.1.",
    language: "Java",
    href: "https://github.com/aminegames125/Veil",
  },
  {
    name: "matmate",
    description: "A Flutter app for solving equations, parsing expressions and rendering LaTeX on a phone.",
    language: "Dart",
    href: "https://github.com/aminegames125/matmate",
  },
  {
    name: "refund_tracker_pro",
    description: "Track purchase refunds, due dates and statuses across mobile, web and desktop from one codebase.",
    language: "Dart",
    href: "https://github.com/aminegames125/refund_tracker_pro",
  },
  {
    name: "VoidTP",
    description: "A Spigot plugin that teleports players back to safety when they fall into the void.",
    language: "Java",
    href: "https://github.com/aminegames125/VoidTP",
  },
  {
    name: "bio-builder",
    description: "A small tool that generates clean personal bios for GitHub, portfolios and social profiles.",
    language: "JavaScript",
    href: "https://github.com/aminegames125/bio-builder",
  },
];

export default function Work() {
  return (
    <Section id="work">
      <SectionHeader index="01" label="Work" title="Projects" intro="Some public projects, plus client and private work I can talk about on request." />

      <Reveal as="ul" className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10">
        {projects.map((p) => (
          <motion.li key={p.name} variants={fadeUp}>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-2 px-6 py-6 transition-colors hover:bg-white/[0.03] md:grid-cols-[1fr_2fr_auto] md:items-center md:gap-8"
            >
              <span className="font-mono text-sm text-white">{p.name}</span>
              <span className="text-sm leading-relaxed text-neutral-400">{p.description}</span>
              <span className="flex items-center gap-3 md:justify-end">
                <span className="font-mono text-xs text-neutral-500">{p.language}</span>
                <ArrowUpRight className="h-4 w-4 text-neutral-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </span>
            </a>
          </motion.li>
        ))}
      </Reveal>

      <Reveal className="mt-6">
        <motion.div
          variants={fadeUp}
          className="grid-lines relative overflow-hidden rounded-xl border border-white/10 bg-neutral-950 p-6 md:p-8"
        >
          <p className="mb-2 font-mono text-xs text-neutral-500">Currently building</p>
          <h3 className="mb-2 text-xl font-semibold tracking-tight text-white">perfect-shop</h3>
          <p className="max-w-xl text-sm leading-relaxed text-neutral-400">
            An online store, from scratch: storefront, backend, database and the server behind it. Built to load fast and rank
            well on a small VPS.
          </p>
        </motion.div>
      </Reveal>
    </Section>
  );
}
