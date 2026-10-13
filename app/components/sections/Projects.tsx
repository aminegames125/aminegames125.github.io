"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { Reveal, Section, SectionHeader, fadeUp } from "../ui";

const specs = [
  { label: "Framework", value: "Next.js 16" },
  { label: "Runtime", value: "Node + Docker" },
  { label: "Repo", value: "Monorepo" },
  { label: "Hosting", value: "Single-core VPS" },
];

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeader
        index="02"
        label="Projects"
        title="What I'm working on"
        intro="One project, built properly, from the database up to the server it runs on."
      />

      <Reveal>
        <motion.article
          variants={fadeUp}
          className="group relative overflow-hidden rounded-xl border border-white/10 bg-neutral-950 transition-colors duration-300 hover:border-white/20"
        >
          <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-70" />

          <div className="relative grid lg:grid-cols-[1.4fr_1fr]">
            <div className="border-b border-white/10 p-8 md:p-12 lg:border-b-0 lg:border-r">
              <div className="mb-6 flex items-center gap-2 font-mono text-xs text-neutral-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Main project
              </div>

              <h3 className="mb-4 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">perfect-shop</h3>

              <p className="mb-10 max-w-md leading-relaxed text-neutral-400">
                An online store I&apos;m building from scratch: storefront, backend, database and the server behind it.
                The goal is pages that load fast and rank well, on hardware that costs very little.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="group/btn inline-flex h-10 items-center gap-2 rounded-md bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
                >
                  Live demo
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                </a>
                <a
                  href="https://github.com/aminegames125"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-md border border-white/15 px-4 text-sm font-medium text-white transition-colors hover:bg-white/[0.06]"
                >
                  <GitBranch className="h-4 w-4" />
                  Source
                </a>
              </div>
            </div>

            <dl className="grid grid-cols-2 lg:grid-cols-1">
              {specs.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  className={`flex flex-col justify-center gap-1 border-white/10 p-6 md:px-8 ${
                    i < specs.length - 1 ? "lg:border-b" : ""
                  } ${i < 2 ? "border-b" : ""} ${i % 2 === 0 ? "border-r lg:border-r-0" : ""}`}
                >
                  <dt className="font-mono text-xs text-neutral-500">{s.label}</dt>
                  <dd className="text-sm font-medium text-neutral-200">{s.value}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </motion.article>
      </Reveal>
    </Section>
  );
}
