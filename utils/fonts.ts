import localFont from 'next/font/local';
import { PT_Sans, Roboto } from 'next/font/google';

export const robotoReg = Roboto({
  weight: '400',
  subsets: ['latin'],
  variable: '--roboto-reg',
});
export const robotoMed = Roboto({
  weight: '500',
  subsets: ['latin'],
  variable: '--roboto-med',
});

export const ptSans = PT_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--pt-sans',
});
export const literalReg = localFont({
  src: '../public/fonts/literal-regular.otf',
  variable: '--literal-reg',
});
export const literalBold = localFont({
  src: '../public/fonts/literal-bold.otf',
  variable: '--literal-bold',
});
export const literalLight = localFont({
  src: '../public/fonts/literal-light.otf',
  variable: '--literal-light',
});
export const karton = localFont({
  src: '../public/fonts/karton.otf',
  variable: '--karton',
});
export const karton2 = localFont({
  src: '../public/fonts/karton2.ttf',
  variable: '--karton2',
});

export const pecita = localFont({
  src: '../public/fonts/Pecita.otf',
  variable: '--pecita',
});
