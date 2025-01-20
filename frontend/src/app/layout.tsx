import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { GeistSans } from 'geist/font/sans';

import 'overlayscrollbars/overlayscrollbars.css';
import '$/styles/globals.css';

import { ReactQueryClientProvider } from '$/components/core/ReactQueryClientProvider';
import { Toaster } from '$/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Supabase Demo',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={`${GeistSans.variable} dark font-display scroll-smooth antialiased scheme-dark focus:scroll-auto`}
      lang='en'
      suppressHydrationWarning
    >
      <body>
        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
