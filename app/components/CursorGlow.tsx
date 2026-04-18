"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
export default function CursorGlow() {
  const mouseX = useMotionValue(0); const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  useEffect(() => { const move = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); }; window.addEventListener("mousemove", move); return () => window.removeEventListener("mousemove", move); }, [mouseX, mouseY]);
  return <motion.div className="pointer-events-none fixed z-[9999] rounded-full" style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%", width: 400, height: 400, background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)" }} />;
}
