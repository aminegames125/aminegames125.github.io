"use client";

import { motion } from "framer-motion";
import { Reveal, Section, SectionHeader, fadeUp } from "../ui";

const groups = [
  { label: "Frontend", tools: ["Next.js", "TypeScript"] },
  { label: "Backend", tools: ["Node.js", "Python", "Go", "Prisma"] },
  { label: "Data", tools: ["PostgreSQL"] },
  { label: "Infrastructure", tools: ["Docker", "Nginx", "Cloudflare", "Mailu"] },
  { label: "Web3", tools: ["Solidity", "Ethereum"] },
];

export default function Stack() {
  return (
    <Section id="stack">
      <SectionHeader index="03" label="Stack" title="What I use" intro="The tools I reach for most, grouped by where they sit." />

      <Reveal as="ul" className="overflow-hidden rounded-xl border border-white/10">
        {groups.map((g) => (
          <motion.li
            key={g.label}
            variants={fadeUp}
            className="grid gap-3 border-b border-white/10 px-6 py-5 transition-colors last:border-b-0 hover:bg-white/[0.02] sm:grid-cols-[180px_1fr] sm:items-center"
          >
            <p className="font-mono text-xs text-neutral-500">{g.label}</p>
            <ul className="flex flex-wrap gap-2">
              {g.tools.map((t) => (
                <li
                  key={t}
                  className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-sm text-neutral-200 transition-colors hover:border-white/25"
                >
                  {t}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </Reveal>
    </Section>
  );
}
