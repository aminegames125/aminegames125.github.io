"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Server, Box, Code2 } from "lucide-react";

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
              I&apos;m Amineos, a full-stack developer from Tunis. I build web apps and host them on a server I set up myself,
              so when something breaks, <span className="text-white font-medium italic underline decoration-violet-500/50 underline-offset-4">I&apos;m the one fixing it</span>. Usually at 2AM.
            </p>
            <p>
              Right now most of my time goes into perfect-shop, an online store I&apos;m building from scratch. I wrote the frontend and the backend,
              designed the database, and configured the server, Docker and Nginx myself.
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
             <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Server</p>
             <p className="mb-2 font-playfair text-4xl font-bold text-white">1 VPS</p>
             <p className="font-mono text-xs text-slate-500 leading-relaxed">One Linux box that I set up and look after. No managed hosting.</p>
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
             <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Containers</p>
             <p className="mb-2 font-playfair text-4xl font-bold text-white">11+</p>
             <p className="font-mono text-xs text-slate-500 leading-relaxed">Docker services running on it, configured by hand.</p>
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
                   <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">How I work</p>
                   <p className="mb-2 font-playfair text-2xl font-bold text-white">Front to back</p>
                   <p className="font-mono text-xs text-slate-500 leading-relaxed">Database, API, UI and deploys. I like knowing how every piece works, so I build all of it.</p>
                </div>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
