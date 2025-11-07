"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

type MagicCardProps = {
  children: React.ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
};

export const MagicCard = ({
  children,
  className,
  gradientSize = 250,
  gradientColor = "hsl(var(--accent))",
}: MagicCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    card.addEventListener("mousemove", handleMouseMove);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      style={
        {
          "--gradient-size": `${gradientSize}px`,
          "--gradient-color": gradientColor,
        } as React.CSSProperties
      }
      className={cn(
        "relative rounded-lg p-px",
        "before:absolute before:inset-px before:rounded-[7px] before:bg-card before:content-['']",
        "after:absolute after:inset-0 after:rounded-lg after:bg-[radial-gradient(var(--gradient-size)_at_var(--mouse-x)_var(--mouse-y),var(--gradient-color),transparent_80%)] after:opacity-0 after:transition-opacity after:duration-500 after:content-[''] after:hover:opacity-40",
        className,
      )}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};
