"use client";

import { motion } from "framer-motion";
import { Moon, Tv } from "lucide-react";
import { Reveal, Section, SectionHeader, fadeUp } from "../ui";

const cards = [
  {
    icon: Moon,
    title: "Most of my work happens at 2AM.",
    text: "Everything is quiet, nobody is messaging me, and it's just me, a fan and a terminal.",
    wide: true,
  },
  {
    icon: Tv,
    title: "Anime kid, unironically.",
    text: "Grew up on Ben 10, Teen Titans and Ninjago. One Piece is usually on while I debug.",
    wide: false,
  },
];

export default function Vibe() {
  return (
    <Section id="vibe">
      <SectionHeader index="04" label="Off the clock" title="The person behind the terminal." />

      <Reveal className="grid gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <motion.div
            key={c.title}
            variants={fadeUp}
            className={`group rounded-xl border border-white/10 bg-neutral-950 p-6 transition-colors hover:border-white/20 md:p-8 ${
              c.wide ? "md:col-span-2" : ""
            }`}
          >
            <c.icon className="mb-8 h-5 w-5 text-neutral-500 transition-colors group-hover:text-white" />
            <h3 className="mb-2 text-xl font-semibold tracking-tight text-white">{c.title}</h3>
            <p className="text-sm leading-relaxed text-neutral-400">{c.text}</p>
          </motion.div>
        ))}
      </Reveal>
    </Section>
  );
}
