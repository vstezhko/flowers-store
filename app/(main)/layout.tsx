'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import BannerSection from '@/components/main/BannerSection';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='wrapper'>
      <Header />
      <main className='main'>
        {usePathname() === '/' ? <BannerSection /> : null}
        <div className='container'>{children}</div>
      </main>
      <Footer />
    </div>
  );
}
