import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Night Shift | Sleep Rescue MVP',
  description:
    'Night Shift is a mobile-first sleep rescue app that maps immediate nighttime friction to targeted calming interventions.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
