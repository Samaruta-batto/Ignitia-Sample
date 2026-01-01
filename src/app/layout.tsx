
'use client';
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { ClientProviders } from '@/components/providers/client-providers';
import './globals.css';
import { SmoothCursor } from '@/components/ui/smooth-cursor';
// Firebase removed - using Rust backend
import { AppFooter } from '@/components/layout/footer';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  return (
    <html lang="en" className="dark">
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/png" href="https://res.cloudinary.com/dov2etaiw/image/upload/v1767273197/icon_ckp9ro.png" />
        <link rel="apple-touch-icon" href="https://res.cloudinary.com/dov2etaiw/image/upload/v1767273197/icon_ckp9ro.png" />
        
        {/* The metadata object is not supported in client components. 
            You can uncomment this if you move this back to a server component.
        <title>Ignitia</title>
        <meta name="description" content="Your one-stop platform for event discovery, merchandise, and more." />
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Roboto:wght@400;500&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased cursor-none">
        <ClientProviders>
          <SmoothCursor />
          <div className="flex flex-col min-h-screen">
            <main className="flex-1 flex flex-col">{children}</main>
            {!isLandingPage && <AppFooter />}
          </div>
          <Toaster />
        </ClientProviders>
      </body>
    </html>
  );
}
