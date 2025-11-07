import * as React from 'react';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="200" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <text
        x="0"
        y="30"
        fontFamily="Oswald, sans-serif"
        fontSize="30"
        fontWeight="bold"
        fill="hsl(var(--accent))"
      >
        FEST
      </text>
      <text
        x="75"
        y="30"
        fontFamily="Oswald, sans-serif"
        fontSize="30"
        fontWeight="bold"
        fill="hsl(var(--foreground))"
      >
        CONNECT
      </text>
    </svg>
  );
}
