import '@/styles/index.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@mui/material';
import FSTheme from '@/MUI/theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Flowers store',
  description: `Discover the enchantment of nature's finest blooms. Fresh and artistic floral arrangements for every occasion. Unforgettable moments await at our Flowers Store.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={FSTheme}>
      <html lang='en'>
        <body className={inter.className}>
          <Header />
          <main className='container'>{children}</main>
          <Footer />
        </body>
      </html>
    </ThemeProvider>
  );
}
