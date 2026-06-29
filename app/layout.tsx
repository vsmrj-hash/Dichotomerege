import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'AI Academy — Master every AI tool through real work',
  description: 'Interactive learning platform with simulators, missions, and prompt libraries for Claude, ChatGPT, Gemini, and more.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
