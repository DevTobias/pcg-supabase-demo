import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { GeistSans } from 'geist/font/sans';

import '$/styles/globals.css';

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
      <body>{children}</body>
    </html>
  );
}
