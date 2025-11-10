
"use client";

import { cn } from "@/lib/utils";
import { useInView, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

export default function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
}: {
  value: number;
  direction?: "up" | "down";
  delay?: number; // seconds
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  const spring = useSpring(0, {
    damping: 20,
    stiffness: 150,
    mass: 1,
  });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        spring.set(value);
      }, delay * 1000);
    }
  }, [isInView, spring, value, delay]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat().format(
          Math.round(latest),
        );
      }
    });
    return () => unsubscribe();
  }, [spring]);

  return <span className={cn(className)} ref={ref} />;
}
