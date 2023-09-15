import React from 'react';
import Texture from '@/public/img/png/texture.webp';
import Image from 'next/image';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='auth-page'>
      <Image src={Texture} alt={'texture'} className='auth-page__background' />
      {children}
    </div>
  );
}
