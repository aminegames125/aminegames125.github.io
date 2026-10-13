"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function BackgroundBlobs() {
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 100]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div 
        style={{ y: y1, backgroundColor: "#3b0764" }}
        className="absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full opacity-30 blur-[120px]" 
      />
      <motion.div 
        style={{ y: y2, backgroundColor: "#1e1b4b" }}
        className="absolute right-0 top-1/3 h-[600px] w-[600px] rounded-full opacity-25 blur-[100px]" 
      />
      <motion.div 
        style={{ y: y3, backgroundColor: "#0c4a6e" }}
        className="absolute -bottom-20 left-1/4 h-[500px] w-[500px] rounded-full opacity-20 blur-[100px]" 
      />
    </div>
  );
}
