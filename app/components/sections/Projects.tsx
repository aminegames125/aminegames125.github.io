"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GitBranch, ExternalLink, Terminal, Globe, Rocket, Layers, Box } from "lucide-react";

export default function Projects() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  return (
    <section ref={ref} id="projects" className="relative z-10 mx-auto max-w-6xl px-8 py-32 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-4"
      >
        <div className="h-px w-8 bg-violet-500/50" />
        <p className="font-mono text-xs tracking-[0.25em] text-violet-400/60 uppercase">
          02 / PORTFOLIO
        </p>
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 font-playfair text-6xl font-bold text-white md:text-7xl"
      >
        Things I actually <br /><span className="shimmer-text italic">shipped.</span>
      </motion.h2>

      <motion.div 
        style={{ scale }}
        className="grid gap-8"
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-[3rem] border border-white/5 p-8 md:p-16 relative overflow-hidden group"
        >
          {/* Decorative background element */}
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-violet-600/5 blur-[100px] group-hover:bg-violet-600/10 transition-all duration-700" />
          
          <div className="relative z-10 grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Rocket className="h-5 w-5 text-emerald-400" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400">Flagship Production</span>
              </div>
              
              <h3 className="font-playfair text-4xl font-black text-white md:text-6xl mb-6 tracking-tight">perfect-shop</h3>
              
              <p className="text-lg leading-relaxed text-slate-400 mb-8 max-w-md">
                A full-stack commerce engine focused on raw performance and SEO. 
                Built to handle high-concurrency without breaking a sweat on a single core VPS.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <a href="#" className="flex items-center gap-2 rounded-full bg-white/5 px-6 py-3 font-mono text-xs font-bold text-white hover:bg-white/10 transition-all border border-white/10">
                  <ExternalLink className="h-4 w-4" /> Live Demo
                </a>
                <a href="https://github.com/aminegames125" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 font-mono text-xs font-bold text-slate-400 hover:text-white transition-all hover:bg-white/5">
                  <GitBranch className="h-4 w-4" /> Source
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               {[
                 { icon: Terminal, label: "Stack", value: "NextJS 16" },
                 { icon: Globe, label: "Region", value: "Tunis" },
                 { icon: Layers, label: "Architecture", value: "Monorepo" },
                 { icon: Box, label: "Runtime", value: "Node/Docker" }
               ].map((stat, i) => (
                 <div key={i} className="rounded-3xl bg-white/[0.03] border border-white/5 p-6 hover:border-violet-500/30 transition-all">
                    <stat.icon className="h-5 w-5 text-violet-400/70 mb-4" />
                    <p className="font-mono text-[9px] uppercase tracking-widest text-slate-500 mb-1">{stat.label}</p>
                    <p className="text-sm font-bold text-slate-300">{stat.value}</p>
                 </div>
               ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
