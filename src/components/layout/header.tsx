import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ShoppingCart } from 'lucide-react';

type AppHeaderProps = {
  title: string;
};

export function AppHeader({ title }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-8">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="font-headline text-xl md:text-2xl uppercase tracking-wider text-foreground">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <ShoppingCart className="text-accent" />
          <span className="sr-only">Shopping Cart</span>
        </Button>
      </div>
    </header>
  );
}
