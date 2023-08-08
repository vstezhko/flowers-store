import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
