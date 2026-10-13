"use client";

import { motion } from "framer-motion";
import { Reveal, Section, SectionHeader, fadeUp } from "../ui";

const groups = [
  { label: "Mobile", tools: ["Flutter", "Dart"] },
  { label: "Web", tools: ["Next.js", "TypeScript", "Node.js"] },
  { label: "Plugins", tools: ["Java", "Kotlin"] },
  { label: "Data", tools: ["PostgreSQL", "Prisma"] },
  { label: "Infrastructure", tools: ["Docker", "Nginx", "Cloudflare"] },
];

const strip = ["Flutter", "Dart", "TypeScript", "Next.js", "Node.js", "PostgreSQL", "Docker", "Nginx", "Java", "Kotlin", "Cloudflare", "Prisma"];

export default function Stack() {
  return (
    <Section id="stack">
      <SectionHeader index="03" label="Stack" title="What I use" />

      <Reveal as="ul" className="mb-12 overflow-hidden rounded-xl border border-white/10">
        {groups.map((g) => (
          <motion.li
            key={g.label}
            variants={fadeUp}
            className="grid gap-3 border-b border-white/10 px-6 py-5 transition-colors last:border-b-0 hover:bg-white/[0.02] sm:grid-cols-[180px_1fr] sm:items-center"
          >
            <p className="font-mono text-xs text-neutral-500">{g.label}</p>
            <ul className="flex flex-wrap gap-2">
              {g.tools.map((t) => (
                <li key={t} className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-sm text-neutral-200 transition-colors hover:border-white/30">
                  {t}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </Reveal>

      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap font-mono text-2xl text-neutral-600">
          {[...strip, ...strip].map((t, i) => (
            <span key={i} className="flex items-center gap-12">
              {t}
              <span className="text-neutral-800">/</span>
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
