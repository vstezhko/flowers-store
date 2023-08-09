import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import React from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='wrapper'>
      <Header />
      <main className='main'>
        <div className='container'>{children}</div>
      </main>
      <Footer />
    </div>
  );
}
