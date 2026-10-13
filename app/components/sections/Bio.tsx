"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Server, Box, Cpu, Code2 } from "lucide-react";

export default function Bio() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={ref} id="bio" className="relative z-10 mx-auto max-w-6xl px-8 py-32 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-4"
      >
        <div className="h-px w-8 bg-violet-500/50" />
        <p className="font-mono text-xs tracking-[0.25em] text-violet-400/60 uppercase">
          01 / WHO
        </p>
      </motion.div>
      
      <div className="grid gap-16 lg:grid-cols-2 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-8 font-playfair text-6xl font-black leading-[1.1] text-white md:text-7xl">
            I run my own <br /><span className="shimmer-text">infrastructure.</span>
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-slate-400 max-w-lg">
            <p>
              I&apos;m Amineos — a full-stack engineer from Tunis who SSHes into a VPS at 2AM to fix an Nginx rewrite rule. 
              I value <span className="text-white font-medium italic underline decoration-violet-500/50 underline-offset-4">ownership</span> over abstraction.
            </p>
            <p>
              My main project is perfect-shop — a commerce platform I built end-to-end on a bare VPS, managing everything from the database to the reverse proxy.
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          style={{ y }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass group rounded-[2rem] p-8 relative overflow-hidden transition-all hover:border-violet-500/40"
          >
             <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl group-hover:bg-violet-500/20 transition-all" />
             <Server className="mb-6 h-8 w-8 text-violet-400" />
             <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Infrastructure</p>
             <p className="mb-2 font-playfair text-4xl font-bold text-white">1 bare</p>
             <p className="font-mono text-xs text-slate-500 leading-relaxed">No cloud providers. Just Linux and high-level intent.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass group rounded-[2rem] p-8 relative overflow-hidden transition-all hover:border-violet-500/40"
          >
             <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 transition-all" />
             <Box className="mb-6 h-8 w-8 text-blue-400" />
             <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Deployment</p>
             <p className="mb-2 font-playfair text-4xl font-bold text-white">11+</p>
             <p className="font-mono text-xs text-slate-500 leading-relaxed">Dockerized services manually orchestrated for maximum control.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="glass group rounded-[2rem] p-8 relative overflow-hidden transition-all hover:border-violet-500/40 md:col-span-2"
          >
             <div className="flex items-start gap-6">
                <Code2 className="h-10 w-10 text-emerald-400 shrink-0" />
                <div>
                   <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Methodology</p>
                   <p className="mb-2 font-playfair text-2xl font-bold text-white">End-to-End Ownership</p>
                   <p className="font-mono text-xs text-slate-500 leading-relaxed">From database schemas to UI micro-interactions, I build the whole pipe.</p>
                </div>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
