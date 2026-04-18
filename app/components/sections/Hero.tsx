"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="hero" className="relative flex h-screen items-center justify-center px-8 text-center overflow-hidden">
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 max-w-5xl"
      >
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, ease: "easeOut" }}
           className="mb-8 inline-block"
        >
          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-violet-300">
            Available for select projects
          </span>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 font-mono text-sm tracking-[0.25em] text-violet-400/70"
        >
          aminegames125 · Tunis, TN
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 font-playfair text-7xl font-black leading-[0.95] tracking-tighter text-white md:text-[9rem]"
        >
          I build <span className="shimmer-text italic pr-4">systems</span> <br /> with intent.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto max-w-2xl font-mono text-xs md:text-sm leading-relaxed text-slate-400"
        >
          Next.js · Docker · PostgreSQL · Ethereum · Nginx · deployed from Tunis at 2AM.
        </motion.p>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-slate-600">Scroll</p>
        <div className="h-10 w-6 rounded-full border border-white/10 p-1">
          <motion.div 
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-full rounded-full bg-violet-500/50 shadow-[0_0_8px_rgba(139,92,246,0.5)]"
          />
        </div>
      </motion.div>
      
      {/* Subtle parallax elements */}
      <motion.div 
        style={{ y: useTransform(scrollY, [0, 1000], [0, -200]), rotate: 12 }}
        className="absolute top-1/4 -left-20 h-64 w-64 rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-3xl"
      />
      <motion.div 
        style={{ y: useTransform(scrollY, [0, 1000], [0, 300]), rotate: -15 }}
        className="absolute bottom-1/4 -right-20 h-80 w-80 rounded-full border border-white/5 bg-gradient-to-tr from-violet-500/5 to-transparent backdrop-blur-3xl"
      />
    </section>
  );
}
