"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

class Star {
  x: number;
  y: number;
  z: number;

  constructor() {
    this.x = Math.random() * 2 - 1;
    this.y = Math.random() * 2 - 1;
    this.z = Math.random();
  }

  update(speed: number) {
    this.z -= speed;
    if (this.z < 0) {
      this.z = 1;
      this.x = Math.random() * 2 - 1;
      this.y = Math.random() * 2 - 1;
    }
  }

  draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
    const x = this.x * (width / (this.z * 2)) + width / 2;
    const y = this.y * (height / (this.z * 2)) + height / 2;
    const size = (1 - this.z) * 3;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${1 - this.z})`;
    ctx.fill();
  }
}

type WarpBackgroundProps = {
  children: React.ReactNode;
  className?: string;
  starCount?: number;
  speed?: number;
};

export const WarpBackground = ({
  children,
  className,
  starCount = 1000,
  speed = 0.005,
}: WarpBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const stars = Array.from({ length: starCount }, () => new Star());

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    window.addEventListener("resize", resize);
    resize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        star.update(speed);
        star.draw(ctx, canvas.width, canvas.height);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [starCount, speed]);

  return (
    <div className={cn("relative", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
