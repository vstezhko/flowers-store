import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React from 'react';
import BannerSection from '@/components/BannerSection';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='wrapper'>
      <Header />
      <main className='main'>
        <BannerSection />
        <div className='container'>{children}</div>
      </main>
      <Footer />
    </div>
  );
}
