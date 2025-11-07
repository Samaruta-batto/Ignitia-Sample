import { cn } from "@/lib/utils";
import React from "react";
import { Slot } from "@radix-ui/react-slot"

type ShimmerButtonProps = {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  shimmerSize?: string;
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;


export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  ({
    children,
    className,
    shimmerColor = "#ffffff",
    shimmerSize = "0.1em",
    asChild = false,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        style={
          {
            "--shimmer-color": shimmerColor,
            "--shimmer-size": shimmerSize,
          } as React.CSSProperties
        }
        className={cn(
          "relative isolate overflow-hidden rounded-lg bg-accent px-6 py-3 font-bold text-accent-foreground transition-all flex items-center justify-center gap-2",
          "before:absolute before:inset-0 before:-z-10 before:translate-x-[calc(-100%_-_var(--shimmer-size))] before:rotate-12 before:border-[length:var(--shimmer-size)] before:border-solid before:border-[color:var(--shimmer-color)] before:opacity-0 before:transition-all before:duration-700 hover:shadow-[0_0_2em_var(--shimmer-color)] hover:before:translate-x-[calc(100%_+_var(--shimmer-size))] hover:before:opacity-100",
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
ShimmerButton.displayName = "ShimmerButton";
