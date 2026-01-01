import * as React from 'react';
import Image from 'next/image';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: 'nav' | 'footer' | 'default';
}

export function Logo({ size = 'default', ...props }: LogoProps) {
  // Define different sizes
  const sizeConfig = {
    nav: {
      width: 360, // 1.5x of original 240
      height: 120,  // 1.5x of original 80
      className: "h-32 w-auto" // 1.5x of h-20 (closest available class)
    },
    footer: {
      width: 640, // 2x size for footer
      height: 214,
      className: "h-56 w-auto"
    },
    default: {
      width: 240, // Original size
      height: 80,
      className: "h-20 w-auto"
    }
  };

  const config = sizeConfig[size];

  return (
    <div className="flex items-center">
      <Image
        src="/images/ignitia2k26.png"
        alt="Ignitia 2K26"
        width={config.width}
        height={config.height}
        className={config.className}
        priority
      />
    </div>
  );
}
