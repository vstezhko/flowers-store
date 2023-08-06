'use client';
import '@/styles/index.scss';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { robotoReg, robotoMed, literalLight, literalBold, literalReg, ptSans, karton, karton2 } from '@/utils/fonts';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <title>Flowers store</title>
        <meta
          name='description'
          content="Discover the enchantment of nature\' s finest blooms. Fresh and artistic
                  floral arrangements for every occasion. Unforgettable moments await at our Flowers Store."
        />
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
      </head>

      <body>
        <Header />
        <main className=' container'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
