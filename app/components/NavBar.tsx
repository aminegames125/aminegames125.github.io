"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Bio", href: "#bio" },
  { label: "Portfolio", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Vibe", href: "#vibe" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-0 transition-all duration-500 ease-in-out">
      <nav
        className={`
          transition-all duration-500 ease-in-out flex items-center justify-between
          ${
            scrolled
              ? "mt-6 w-[95%] md:w-fit rounded-full py-2 px-8 liquid-glass gap-12"
              : "w-full border-b border-white/[0.06] bg-transparent py-6 px-12"
          }
        `}
      >
        <div className="flex items-center">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white">amineos</span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-12 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-300 md:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-4 right-4 liquid-glass rounded-3xl p-8 md:hidden shadow-2xl"
          >
            <ul className="flex flex-col gap-6 text-center">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-sm font-bold uppercase tracking-widest text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
