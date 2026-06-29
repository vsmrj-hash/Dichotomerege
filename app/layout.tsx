import './globals.css';
import type { ReactNode } from 'react';
import type { Viewport } from 'next';

export const metadata = {
  title: 'AI Academy — Master every AI tool through real work',
  description: 'Interactive learning platform with simulators, missions, and prompt libraries for Claude, ChatGPT, Gemini, and more.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
