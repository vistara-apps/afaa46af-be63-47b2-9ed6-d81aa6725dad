import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ThemeProvider } from './components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SquadSats - Pool funds with friends and auto-invest in crypto',
  description: 'A Base MiniApp that allows groups of friends to pool small amounts of crypto and collectively invest in curated digital assets.',
  keywords: ['crypto', 'investment', 'friends', 'pool', 'base', 'miniapp'],
  openGraph: {
    title: 'SquadSats',
    description: 'Pool funds with friends and auto-invest in crypto, together.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
