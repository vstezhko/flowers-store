'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React from 'react';
import { usePathname } from 'next/navigation';
import BannerSection from '@/components/BannerSection';

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
