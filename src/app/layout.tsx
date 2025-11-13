import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { ClientProviders } from '@/components/providers/client-providers';
import './globals.css';
import { SmoothCursor } from '@/components/ui/smooth-cursor';
import { FirebaseClientProvider } from '@/firebase';
import { AppFooter } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'Ignitia',
  description: 'Your one-stop platform for event discovery, merchandise, and more.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Roboto:wght@400;500&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />

      </head>
      <body className="font-body antialiased cursor-none">
        <FirebaseClientProvider>
          <ClientProviders>
            <SmoothCursor />
            <div className="flex flex-col min-h-screen">
              <main className="flex-1 flex flex-col">{children}</main>
              <AppFooter />
            </div>
            <Toaster />
          </ClientProviders>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
