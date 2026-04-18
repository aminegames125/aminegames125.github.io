"use client";

import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

const stack = [
  "Next.js", "TypeScript", "Docker", "PostgreSQL", "Prisma", "Nginx",
  "Cloudflare", "Node.js", "Python", "Go", "Solidity", "Mailu"
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

export default function Stack() {
  return (
    <section id="stack" className="relative z-10 mx-auto max-w-6xl px-8 py-32">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-4"
      >
        <div className="h-px w-8 bg-violet-500/50" />
        <p className="font-mono text-xs tracking-[0.25em] text-violet-400/60 uppercase">
          03 / STACK
        </p>
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-4 font-playfair text-6xl font-black text-white md:text-7xl flex items-center gap-6 flex-wrap"
      >
        Tools with <span className="shimmer-text">opinions.</span>
        <Cpu className="h-12 w-12 text-violet-500/30" />
      </motion.h2>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6"
      >
        {stack.map((t) => (
          <motion.div 
            key={t} 
            variants={item}
            whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(139, 92, 246, 0.3)" }}
            className="glass flex aspect-square items-center justify-center rounded-[1.5rem] p-4 text-center font-mono text-xs text-slate-300 transition-all cursor-default border border-white/5 shadow-xl"
          >
            {t}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
