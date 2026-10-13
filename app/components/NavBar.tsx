"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || isOpen ? "border-white/10 bg-black/70 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-8">
        <a href="#hero" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white font-mono text-xs font-bold text-black">a</span>
          amineos
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-md px-3 py-2 text-sm text-neutral-400 transition-colors hover:bg-white/[0.06] hover:text-white">
                {l.label}
              </a>
            </li>
          ))}
          <li className="ml-3">
            <a href="#contact" className="inline-flex h-8 items-center rounded-md bg-white px-3 text-sm font-medium text-black transition-colors hover:bg-neutral-200">
              Contact
            </a>
          </li>
        </ul>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-neutral-300 md:hidden"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-white/10 px-6 md:hidden"
          >
            {[...links, { label: "Contact", href: "#contact" }].map((l) => (
              <li key={l.href} className="border-b border-white/10 last:border-b-0">
                <a href={l.href} onClick={() => setIsOpen(false)} className="block py-4 text-sm text-neutral-300">
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
