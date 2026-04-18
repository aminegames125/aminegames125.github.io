"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MoveLeft, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#020617] p-8 text-center px-8">
      {/* Background Blobs - Reusing aesthetic */}
      <div className="absolute top-1/4 -left-20 h-64 w-64 rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 h-80 w-80 rounded-full border border-white/5 bg-gradient-to-tr from-violet-500/5 to-transparent backdrop-blur-3xl animate-pulse" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="mb-12 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-violet-600/10 border border-violet-500/20 glass shadow-2xl">
          <AlertCircle className="h-12 w-12 text-violet-400" />
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 font-playfair text-7xl font-black text-white md:text-9xl"
        >
          404.
        </motion.h1>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 font-mono text-sm uppercase tracking-[0.3em] text-violet-400"
        >
          You found <span className="text-white">nothing.</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12 max-w-sm text-lg text-slate-400 leading-relaxed"
        >
          The page you are looking for has been purged or moved to a different sector.
        </motion.p>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <Link 
              href="/" 
              className="group liquid-glass flex items-center gap-3 rounded-full px-10 py-5 font-mono text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 border border-white/10"
            >
              <MoveLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Re-route Home
            </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
