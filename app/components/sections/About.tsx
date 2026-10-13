"use client";

import { motion } from "framer-motion";
import { Reveal, Section, SectionHeader, fadeUp } from "../ui";

const facts = [
  { label: "Based in", value: "Tunisia" },
  { label: "Working", value: "Remote" },
  { label: "Main stack", value: "Flutter, TypeScript" },
  { label: "Servers", value: "1 VPS, self-managed" },
];

export default function About() {
  return (
    <Section id="about">
      <SectionHeader index="02" label="About" title="I like knowing how every piece works." />

      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <Reveal className="max-w-lg space-y-5 text-lg leading-relaxed text-neutral-400">
          <motion.p variants={fadeUp}>
            I&apos;m Amineos. I work on mobile apps in Flutter and web apps in TypeScript, and I host what I build on a
            server I set up myself. When something breaks, <span className="text-white">I&apos;m the one fixing it</span>,
            usually late at night.
          </motion.p>
          <motion.p variants={fadeUp}>
            Most of my real work happens between midnight and 4AM, when the messages stop and it&apos;s just me, a fan and a
            terminal. Outside work I build Minecraft plugins and mods, and One Piece usually plays in the background.
          </motion.p>
        </Reveal>

        <Reveal as="ul" className="grid grid-cols-2 overflow-hidden rounded-xl border border-white/10">
          {facts.map((f, i) => (
            <motion.li
              key={f.label}
              variants={fadeUp}
              className={`border-white/10 p-6 ${i < 2 ? "border-b" : ""} ${i % 2 === 0 ? "border-r" : ""}`}
            >
              <p className="mb-2 font-mono text-xs text-neutral-500">{f.label}</p>
              <p className="text-sm font-medium text-neutral-200">{f.value}</p>
            </motion.li>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
