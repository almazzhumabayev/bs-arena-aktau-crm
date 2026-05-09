import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'BS ARENA',
    template: '%s | BS ARENA'
  },
  description: 'Спортивный комплекс и фитнес зал BS ARENA в Актау.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
