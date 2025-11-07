import { cn } from "@/lib/utils";
import React from "react";

type ShimmerButtonProps = {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  shimmerSize?: string;
};

export const ShimmerButton = ({
  children,
  className,
  shimmerColor = "#ffffff",
  shimmerSize = "0.1em",
}: ShimmerButtonProps) => {
  return (
    <button
      style={
        {
          "--shimmer-color": shimmerColor,
          "--shimmer-size": shimmerSize,
        } as React.CSSProperties
      }
      className={cn(
        "relative isolate overflow-hidden rounded-lg bg-accent px-6 py-3 text-lg font-bold text-accent-foreground transition-all",
        "before:absolute before:inset-0 before:-z-10 before:translate-x-[calc(-100%_-_var(--shimmer-size))] before:rotate-12 before:border-[length:var(--shimmer-size)] before:border-solid before:border-[color:var(--shimmer-color)] before:opacity-0 before:transition-all before:duration-700 hover:shadow-[0_0_2em_var(--shimmer-color)] hover:before:translate-x-[calc(100%_+_var(--shimmer-size))] hover:before:opacity-100",
        className,
      )}
    >
      {children}
    </button>
  );
};
