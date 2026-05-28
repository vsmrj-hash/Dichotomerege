import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'AI Automation Systems for SMBs',
  description: 'AI automation systems that save time, reduce costs, and help small businesses scale faster.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
