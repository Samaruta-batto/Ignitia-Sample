'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export const SmoothCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;
    let animationFrameId: number;

    if (!cursorDot || !cursorOutline) return;

    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      posX += (mouseX - posX) * 0.1;
      posY += (mouseY - posY) * 0.1;

      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      cursorOutline.style.transform = `translate3d(${posX - 20}px, ${posY - 20}px, 0)`;

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('a, button, [role="button"], input, textarea, select')) {
            setIsHovering(true);
        }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('a, button, [role="button"], input, textarea, select')) {
            setIsHovering(false);
        }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseout', handleMouseOut);
    
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDotRef}
        className="cursor-dot fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-[1000] transition-transform duration-75 ease-out"
      />
      <div
        ref={cursorOutlineRef}
        className={cn(
            "cursor-outline fixed top-0 left-0 w-10 h-10 rounded-full border border-accent/50 pointer-events-none z-[1000] transition-all duration-300 ease-out",
            isHovering && "w-12 h-12 bg-accent/20 scale-110"
        )}
      />
    </>
  );
};
