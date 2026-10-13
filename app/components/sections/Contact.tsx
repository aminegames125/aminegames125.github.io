"use client";

import { motion } from "framer-motion";
import { GitBranch, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Reveal, Section, fadeUp } from "../ui";

const field =
  "w-full rounded-md border border-white/10 bg-black px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-white/40";

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
        } catch {
            console.error("Submission error");
            setStatus("error");
        }
    };

  return (
    <Section id="contact">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <motion.p variants={fadeUp} className="mb-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
            04 / Contact
          </motion.p>
          <motion.h2 variants={fadeUp} className="mb-6 text-4xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
            Let&apos;s build something.
          </motion.h2>
          <motion.p variants={fadeUp} className="mb-10 max-w-md leading-relaxed text-neutral-400">
            I&apos;m open to remote work and new projects. If you need an app built, or a server set up to run it, send me a
            message.
          </motion.p>
          <motion.a
            variants={fadeUp}
            href="https://github.com/aminegames125"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-lg border border-white/10 px-4 py-3 transition-colors hover:border-white/25 hover:bg-white/[0.03]"
          >
            <GitBranch className="h-4 w-4 text-neutral-400 transition-colors group-hover:text-white" />
            <span className="text-sm text-white">github.com/aminegames125</span>
          </motion.a>
        </Reveal>

        <Reveal>
          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit}
            className="rounded-xl border border-white/10 bg-neutral-950 p-6 md:p-8"
          >
            <h3 className="mb-1 text-lg font-semibold text-white">Send a message</h3>
            <p className="mb-6 text-sm text-neutral-500">It goes straight to my Discord.</p>

            <div className="space-y-4">
              <label className="block space-y-2">
                <span className="text-sm text-neutral-400">Name</span>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className={field}
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm text-neutral-400">Message</span>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="What are you working on?"
                  rows={5}
                  className={`${field} resize-none`}
                />
              </label>
            </div>

            <button
              disabled={status === "sending"}
              className={`mt-6 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors disabled:opacity-70 ${
                status === "success"
                  ? "bg-emerald-500 text-black"
                  : status === "error"
                    ? "bg-red-500 text-white"
                    : "bg-white text-black hover:bg-neutral-200"
              }`}
            >
              {status === "sending" ? (
                <>Sending <Loader2 className="h-4 w-4 animate-spin" /></>
              ) : status === "success" ? (
                <>Sent, thanks! <CheckCircle2 className="h-4 w-4" /></>
              ) : status === "error" ? (
                <>Didn&apos;t go through. Try again later.</>
              ) : (
                <>Send message <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </motion.form>
        </Reveal>
      </div>
    </Section>
  );
}
