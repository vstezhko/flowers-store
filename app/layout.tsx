'use client';
import '@/styles/index.scss';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { robotoReg, robotoMed, literalLight, literalBold, literalReg, ptSans, karton, karton2 } from '@/utils/fonts';

export const metadata: Metadata = {
  title: 'Flowers store',
  description: `Discover the enchantment of nature's finest blooms. Fresh and artistic floral arrangements for every occasion. Unforgettable moments await at our Flowers Store.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <style jsx global>{`
        :root {
          --literal-reg: ${literalReg.style.fontFamily};
          --literal-bold: ${literalBold.style.fontFamily};
          --literal-light: ${literalLight.style.fontFamily};
          --roboto-reg: ${robotoReg.style.fontFamily};
          --roboto-med: ${robotoMed.style.fontFamily};
          --pt-sans: ${ptSans.style.fontFamily};
          --karton: ${karton.style.fontFamily};
          --karton2: ${karton2.style.fontFamily};
        }
      `}</style>
      <body>
        <Header />
        <main className='container'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
