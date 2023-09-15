import React from 'react';
import BackgroundTexture from '@/components/BackroundTexture';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='auth-page'>
      <BackgroundTexture />
      {children}
    </div>
  );
}
