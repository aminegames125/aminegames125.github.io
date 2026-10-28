"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type CountUpProps = { value: number; suffix: string };

/**
 * Renders the final number on the server and without JavaScript, then counts up once on enter.
 * The final value is also laid out invisibly, so the width never changes.
 */
export default function CountUp({ value, suffix }: CountUpProps) {
  const target = useRef<HTMLSpanElement>(null);
  const inView = useInView(target, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = target.current;
    if (!node || !inView || reduceMotion) return;
    const controls = animate(0, value, {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (current) => {
        node.textContent = String(Math.round(current));
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  return (
    <>
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
    </>
  );
}
