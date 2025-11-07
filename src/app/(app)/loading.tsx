import { Flame } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-[1001]">
      <Flame className="w-24 h-24 text-accent animate-pulse" />
    </div>
  );
}
