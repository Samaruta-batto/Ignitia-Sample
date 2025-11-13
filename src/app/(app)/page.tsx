
'use client'

import { redirect } from 'next/navigation'

// This page is no longer needed as the root page.tsx is the landing page.
// We can redirect to /home as the main app entry point if needed,
// but for now we'll just keep the structure clean.
// The content that was here has been moved to src/app/(app)/home/page.tsx
export default function AppRootPage() {
  redirect('/home');
}
