"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "./motion";

/** The giant footer name. Its letters rise into the cropped edge when the footer scrolls in. */
export default function Wordmark({ text }: { text: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          SplitText.create(root.current, {
            type: "chars",
            aria: "none",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.chars, {
                yPercent: 110,
                duration: 0.8,
                stagger: 0.05,
                ease: "power4.out",
                scrollTrigger: {
                  trigger: root.current,
                  start: "top 95%",
                  toggleActions: "play none none none",
                  once: true,
                },
              }),
          });
        },
        root,
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="wordmark select-none font-display font-extrabold tracking-wordmark"
    >
      {text}
    </div>
  );
}
