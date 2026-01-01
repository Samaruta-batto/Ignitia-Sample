import * as React from 'react';
import Image from 'next/image';

interface FlameIconProps {
  size?: number;
  className?: string;
}

export function FlameIcon({ size = 24, className = "" }: FlameIconProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <Image
        src="/images/ignitia2k26.png"
        alt="Ignitia Flame"
        width={size}
        height={size}
        className="object-contain"
      />
    </div>
  );
}

// For use as just the flame part (cropped)
export function FlameIconOnly({ size = 24, className = "" }: FlameIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`text-accent ${className}`}
    >
      {/* Flame shape extracted from the logo */}
      <path 
        d="M50 5C45 8 40 15 35 25C30 35 25 50 30 65C35 80 45 90 50 95C55 100 65 105 75 95C80 85 85 70 80 55C75 40 70 25 65 15C60 10 55 7 50 5Z" 
        fill="currentColor"
      />
      <path 
        d="M50 20C47 23 44 28 42 35C40 42 38 50 42 58C46 66 50 72 52 78C54 75 58 70 62 62C66 54 65 46 63 38C61 30 58 25 55 22C53 20 51 19 50 20Z" 
        fill="hsl(var(--background))"
      />
      <path 
        d="M50 35C49 37 48 40 47 44C46 48 45 52 47 56C49 60 51 63 52 66C53 64 55 61 57 57C59 53 58 49 57 45C56 41 55 38 54 36C52 35 51 34 50 35Z" 
        fill="currentColor"
      />
    </svg>
  );
}