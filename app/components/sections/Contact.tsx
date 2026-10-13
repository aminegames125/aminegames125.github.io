"use client";

import { motion } from "framer-motion";
import { GitBranch, ArrowRight, MessageSquare, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", message: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.message) return;
        setStatus("sending");

        try {
            // Recursive Multi-Layer Decoding (Insanity Tier)
            let _val = process.env.NEXT_PUBLIC_DISCORD_SECRET || "";
            const layers = 15; // Any more than this will crash the build/browser
            
            for (let i = 0; i < layers; i++) {
                _val = atob(_val);
            }

            const response = await fetch(_val, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: `**New Message from Portfolio**\n**Name:** ${formData.name}\n**Message:** ${formData.message}`,
                }),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", message: "" });
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Submission error");
            setStatus("error");
        }
    };

  return (
    <section id="contact" className="relative z-10 mx-auto max-w-6xl px-8 pb-40 pt-20">
      <div className="mb-24 h-px w-full bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-px w-8 bg-violet-500/50" />
            <p className="font-mono text-xs tracking-[0.25em] text-violet-400/60 uppercase">
              05 / CONTACT
            </p>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 font-playfair text-6xl font-black leading-[1.05] text-white md:text-8xl"
          >
            Let&apos;s build <br /><span className="shimmer-text">something.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-12 max-w-md text-lg leading-relaxed text-slate-400"
          >
            I&apos;m currently open to new opportunities and interesting engineering challenges. 
            If you need a system built from the ground up, let&apos;s talk.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <a href="https://github.com/aminegames125" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-white">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 transition-colors group-hover:bg-violet-600">
                <GitBranch className="h-5 w-5" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Github</p>
                <p className="font-medium">aminegames125</p>
              </div>
            </a>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass rounded-[3rem] p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent" />
          <MessageSquare className="mb-8 h-12 w-12 text-violet-500/50" />
          <h3 className="mb-6 font-playfair text-3xl font-bold text-white">Quick Message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-slate-500 ml-4">Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe" 
                className="w-full rounded-2xl border border-white/5 bg-white/5 p-4 text-white outline-none focus:border-violet-500/50 transition-all font-mono text-sm" 
              />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-slate-500 ml-4">Message</label>
              <textarea 
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Hey Amineos, I have a project..." 
                rows={4} 
                className="w-full rounded-2xl border border-white/5 bg-white/5 p-4 text-white outline-none focus:border-violet-500/50 transition-all font-mono text-sm resize-none" 
              />
            </div>
            
            <button 
              disabled={status === "sending"}
              className={`flex w-full items-center justify-center gap-3 rounded-2xl py-4 font-bold text-white transition-all active:scale-[0.98] ${
                status === "success" 
                ? "bg-emerald-600" 
                : status === "error"
                ? "bg-red-600"
                : "bg-violet-600 hover:bg-violet-500"
              }`}
            >
              {status === "sending" ? (
                <>Sending... <Loader2 className="h-4 w-4 animate-spin" /></>
              ) : status === "success" ? (
                <>Sent Successfully! <CheckCircle2 className="h-4 w-4" /></>
              ) : status === "error" ? (
                <>Try Again Later</>
              ) : (
                <>Send Message <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </form>
        </motion.div>
      </div>

      <footer className="mt-40 flex flex-col items-center justify-center gap-8 border-t border-white/5 pt-12">
        <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest text-center">© 2026 Amineos · All rights reserved</p>
      </footer>
    </section>
  );
}
