import localFont from 'next/font/local';
import { Josefin_Sans } from 'next/font/google';

export const karton = localFont({
  src: '../public/fonts/karton.otf',
  variable: '--karton',
});

export const pecita = localFont({
  src: '../public/fonts/Pecita.otf',
  variable: '--pecita',
});

export const avenirReg = localFont({
  src: '../public/fonts/Avenir-reg.otf',
  variable: '--avenir-reg',
});

export const avenirBold = localFont({
  src: '../public/fonts/Avenir-bold.otf',
  variable: '--avenir-bold',
});

export const josefinSans = Josefin_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--josefin-sans',
});
