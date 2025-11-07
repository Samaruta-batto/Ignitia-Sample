import { Flame } from 'lucide-react';
import * as React from 'react';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-2">
      <Flame className="text-accent h-8 w-8" />
      <span
        className="font-headline text-3xl font-bold"
        style={{ color: 'hsl(var(--foreground))' }}
      >
        IGNITIA
      </span>
    </div>
  );
}
