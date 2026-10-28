"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./motion";

type CountUpProps = { value: number; suffix: string };

/**
 * Renders the final number on the server and without JavaScript, then counts up once as the
 * hero's stats arrive. The final value is also laid out invisibly, so the width never changes.
 */
export default function CountUp({ value, suffix }: CountUpProps) {
  const wrapper = useRef<HTMLSpanElement>(null);
  const target = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const node = target.current;
      // A count from 0 to 1 is only a flip, so single figures just sit there.
      if (!node || value < 2) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const counter = { value: 0 };
        node.textContent = "0";
        gsap.to(counter, {
          value,
          duration: 0.9,
          delay: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: node,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
          onUpdate: () => {
            node.textContent = String(Math.round(counter.value));
          },
        });
        return () => {
          node.textContent = String(value);
        };
      });
      return () => mm.revert();
    },
    { scope: wrapper },
  );

  return (
    <span ref={wrapper}>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span aria-hidden="true" className="inline-grid tabular-nums">
        <span className="invisible col-start-1 row-start-1">{value}</span>
        <span ref={target} className="col-start-1 row-start-1">
          {value}
        </span>
      </span>
      <span aria-hidden="true">{suffix}</span>
    </span>
  );
}
