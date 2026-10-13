"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Section, SectionHeader, SpotlightCard, fadeUp } from "../ui";

// Public repos only. Private projects are left out on purpose.
const featured = [
  {
    name: "matmate",
    kind: "Flutter app",
    description:
      "Type in an equation and it solves it, parses the expression and renders the LaTeX on a phone screen. Built to make algebra feel less like a wall of text.",
    tags: ["Flutter", "Dart", "Math parsing", "LaTeX"],
    href: "https://github.com/aminegames125/matmate",
  },
  {
    name: "Veil",
    kind: "Minecraft mod",
    description:
      "Permission-gated passages between places, built on Immersive Portals for Fabric 1.21.1. Normal doors, with shortcuts you have to earn.",
    tags: ["Java", "Fabric", "1.21.1"],
    href: "https://github.com/aminegames125/Veil",
  },
  {
    name: "refund_tracker_pro",
    kind: "Cross-platform app",
    description:
      "Track purchase refunds, due dates and statuses across mobile, web and desktop, all from one codebase.",
    tags: ["Flutter", "Dart", "Mobile", "Web", "Desktop"],
    href: "https://github.com/aminegames125/refund_tracker_pro",
  },
];

const more = [
  { name: "VoidTP", description: "A Spigot plugin that teleports players back to safety when they fall into the void.", language: "Java", href: "https://github.com/aminegames125/VoidTP" },
  { name: "bio-builder", description: "Generates clean personal bios for GitHub, portfolios and social profiles.", language: "JavaScript", href: "https://github.com/aminegames125/bio-builder" },
];

export default function Work() {
  return (
    <Section id="work">
      <SectionHeader index="01" label="Work" title="Things I've built" intro="A few projects I'm proud of. Private and client work is available to talk about on request." />

      <div className="grid gap-4 md:grid-cols-2">
        {featured.map((p, i) => (
          <Reveal key={p.name} className={i === 0 ? "md:col-span-2" : ""}>
            <motion.div variants={fadeUp}>
              <SpotlightCard className="h-full">
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="flex h-full flex-col p-7 md:p-9">
                  <div className="mb-10 flex items-center justify-between gap-4">
                    <span className="font-mono text-xs text-neutral-500">{p.kind}</span>
                    <ArrowUpRight className="h-4 w-4 text-neutral-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </div>
                  <h3 className="mb-3 font-mono text-2xl font-medium tracking-tight text-white md:text-3xl">{p.name}</h3>
                  <p className="mb-8 max-w-xl leading-relaxed text-neutral-400">{p.description}</p>
                  <ul className="mt-auto flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li key={t} className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-xs text-neutral-400">
                        {t}
                      </li>
                    ))}
                  </ul>
                </a>
              </SpotlightCard>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <Reveal as="ul" className="mt-4 grid gap-4 md:grid-cols-2">
        {more.map((p) => (
          <motion.li key={p.name} variants={fadeUp}>
            <SpotlightCard>
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="flex h-full flex-col gap-3 p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-base text-white">{p.name}</span>
                  <span className="flex items-center gap-2 font-mono text-xs text-neutral-500">
                    {p.language}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-neutral-400">{p.description}</p>
              </a>
            </SpotlightCard>
          </motion.li>
        ))}
      </Reveal>

      <Reveal className="mt-4">
        <motion.div variants={fadeUp}>
          <SpotlightCard>
            <div className="flex flex-col gap-4 p-7 md:flex-row md:items-center md:justify-between md:p-9">
              <div>
                <p className="mb-2 font-mono text-xs text-neutral-500">Currently building</p>
                <h3 className="mb-2 font-mono text-xl text-white">perfect-shop</h3>
                <p className="max-w-xl text-sm leading-relaxed text-neutral-400">
                  An online store from scratch: storefront, backend, database and the server behind it, tuned to load fast on a small VPS.
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 px-3 py-1 font-mono text-xs text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                In progress
              </span>
            </div>
          </SpotlightCard>
        </motion.div>
      </Reveal>
    </Section>
  );
}
