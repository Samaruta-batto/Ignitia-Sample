
"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

type InteractiveGridPatternProps = {
  children: React.ReactNode;
  className?: string;
  gridSize?: number;
  glowSize?: number;
  glowColor?: string;
};

export const InteractiveGridPattern = ({
  children,
  className,
  gridSize = 30,
  glowSize = 200,
  glowColor = "hsl(var(--accent))",
}: InteractiveGridPatternProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      container.style.setProperty("--mouse-x", `${x}px`);
      container.style.setProperty("--mouse-y", `${y}px`);
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={
        {
          "--grid-size": `${gridSize}px`,
          "--glow-size": `${glowSize}px`,
          "--glow-color": glowColor,
        } as React.CSSProperties
      }
      className={cn(
        "relative w-full h-full",
        "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,transparent,hsl(var(--background))_80%),linear-gradient(transparent,hsl(var(--background)))] before:z-10 before:pointer-events-none before:content-['']",
        "after:absolute after:inset-0 after:bg-[size:var(--grid-size)_var(--grid-size)] after:bg-repeat after:bg-[image:linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] after:opacity-100 after:z-0 after:content-['']",
        "dark:after:bg-[image:linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)]",
        className
      )}
    >
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(var(--glow-size)_at_var(--mouse-x)_var(--mouse-y),var(--glow-color)_10%,transparent_80%)] opacity-10 blur-2xl transition-opacity duration-500" />
      <div className="relative z-20">{children}</div>
    </div>
  );
};
