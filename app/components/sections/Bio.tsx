"use client";

import { motion } from "framer-motion";
import { Server, Box, Code2 } from "lucide-react";
import { Reveal, Section, SectionHeader, fadeUp } from "../ui";

const facts = [
  { icon: Server, label: "Servers", value: "1 VPS", text: "One Linux box that I set up and look after. No managed hosting." },
  { icon: Box, label: "Containers", value: "11+", text: "Docker services running on it, configured by hand." },
  { icon: Code2, label: "How I work", value: "Front to back", text: "Database, API, UI and deploys. I like knowing how every piece works." },
];

export default function Bio() {
  return (
    <Section id="bio">
      <SectionHeader index="01" label="About" title="I run my own infrastructure." />

      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal className="max-w-lg space-y-5 text-lg leading-relaxed text-neutral-400">
          <motion.p variants={fadeUp}>
            I&apos;m Amineos, a full-stack developer from Tunis. I build web apps and host them on a server I set up
            myself, so when something breaks, <span className="text-white">I&apos;m the one fixing it</span>. Usually at 2AM.
          </motion.p>
          <motion.p variants={fadeUp}>
            Right now most of my time goes into perfect-shop, an online store I&apos;m building from scratch. I wrote the
            frontend and the backend, designed the database, and configured the server, Docker and Nginx myself.
          </motion.p>
        </Reveal>

        <Reveal as="ul" className="grid overflow-hidden rounded-xl border border-white/10 sm:grid-cols-2">
          {facts.map((f, i) => (
            <motion.li
              key={f.label}
              variants={fadeUp}
              className={`group border-white/10 p-6 transition-colors hover:bg-white/[0.03] ${
                i === facts.length - 1 ? "sm:col-span-2" : "border-b sm:odd:border-r"
              }`}
            >
              <f.icon className="mb-6 h-5 w-5 text-neutral-500 transition-colors group-hover:text-white" />
              <p className="mb-1 font-mono text-xs text-neutral-500">{f.label}</p>
              <p className="mb-2 text-2xl font-semibold tracking-tight text-white">{f.value}</p>
              <p className="text-sm leading-relaxed text-neutral-400">{f.text}</p>
            </motion.li>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
