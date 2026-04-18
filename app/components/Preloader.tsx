"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#080810]"
        >
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 bg-violet-600/20 blur-[120px] rounded-full" />
          
          <div className="relative flex flex-col items-center">
            {/* Logo placeholder or icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-12 font-mono text-[10px] uppercase tracking-[0.5em] text-white/40"
            >
              System Initializing
            </motion.div>

            {/* Circular Progress */}
            <div className="relative h-24 w-24">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle
                  className="text-white/5"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="transparent"
                  r="45"
                  cx="50"
                  cy="50"
                />
                <motion.circle
                  className="text-violet-500"
                  strokeWidth="2"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * progress) / 100}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="45"
                  cx="50"
                  cy="50"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-white">
                {progress}%
              </div>
            </div>

            {/* Subtext */}
            <motion.div 
               animate={{ opacity: [0.4, 1, 0.4] }}
               transition={{ repeat: Infinity, duration: 2 }}
               className="mt-12 font-mono text-[8px] uppercase tracking-widest text-slate-500"
            >
              Loading Amineos Core v8.0
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
