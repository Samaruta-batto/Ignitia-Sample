
"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const LightRays = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--accent)),transparent_40%)]" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 animate-[spin_20s_linear_infinite] bg-[conic-gradient(from_0deg,transparent,hsl(var(--accent)),transparent_20%)]" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};
