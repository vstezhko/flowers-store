'use client';
import '@/styles/index.scss';
import { ThemeProvider } from '@mui/material';
import FSTheme from '@/MUI/theme';
import {
  robotoReg,
  robotoMed,
  literalLight,
  literalBold,
  literalReg,
  karton,
  karton2,
  ptSans,
  pecita,
} from '@/utils/fonts';
import React from 'react';
import { Providers } from '@/redux/providers';
import MiddleWareComponent from '@/components/middleware/MiddleWareComponent';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <ThemeProvider theme={FSTheme}>
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
                --pecita: ${pecita.style.fontFamily};
              }
            `}</style>
          </head>
          <body>
            <MiddleWareComponent>{children}</MiddleWareComponent>
          </body>
        </html>
      </ThemeProvider>
    </Providers>
  );
}
