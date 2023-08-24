'use client';
import '@/styles/index.scss';
import { ThemeProvider } from '@mui/material';
import FSTheme from '@/MUI/theme';
import { karton, pecita, avenirReg, avenirBold,  josefinSans } from '@/utils/fonts';
import React from 'react';
import { Providers } from '@/redux/providers';
import AuthComponent from '@/components/AuthComponent';
import { SnackBarProvider } from '@/components/provider/SnackBar';

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
            --karton: ${karton.style.fontFamily};
            --pecita: ${pecita.style.fontFamily};
            --avenir-reg: ${avenirReg.style.fontFamily};
            --avenir-bold: ${avenirBold.style.fontFamily};
            --josefin-sans: ${josefinSans.style.fontFamily};
          }
        `}</style>
      </head>
      <body>
        <Providers>
          <ThemeProvider theme={FSTheme}>
            <SnackBarProvider>
              <AuthComponent>{children}</AuthComponent>
            </SnackBarProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
