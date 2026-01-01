'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  speed?: 'slow' | 'normal' | 'fast';
}

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = false,
  speed = 'normal',
}: MarqueeProps) {
  const speedClass = {
    slow: 'animate-marquee-slow',
    normal: 'animate-marquee',
    fast: 'animate-marquee-fast',
  }[speed];

  return (
    <div
      className={cn(
        'group flex overflow-hidden [--duration:40s] [--gap:1rem]',
        className
      )}
    >
      <div
        className={cn(
          'flex shrink-0 justify-around min-w-full gap-[--gap]',
          speedClass,
          reverse && '[animation-direction:reverse]',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          'flex shrink-0 justify-around min-w-full gap-[--gap]',
          speedClass,
          reverse && '[animation-direction:reverse]',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}