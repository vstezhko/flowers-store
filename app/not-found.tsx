/* eslint-disable unicorn/filename-case */
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import NotFoundImg from '@/public/img/png/not-found.png';
import MainLayout from '@/app/(main)/layout';
import FsButton from '@/components/UI/FsButton';

export default function NotFound() {
  const router = useRouter();
  const handleBtnClick = () => {
    router.push('/');
  };
  return (
    <MainLayout>
      <section className='error'>
        <div className='error__container'>
          <div className='error__img-container'>
            <Image className='error__img' fill={true} src={NotFoundImg.src} alt='Not found' />
          </div>
          <div className='error__text-block'>
            <h3>Oops... Something went wrong</h3>
            <p>
              It looks like the page you&apos;re looking for wasn&apos;t found. While we&apos;re fixing it, check page.
            </p>
          </div>
          <FsButton onClick={handleBtnClick} label='Home' />
        </div>
      </section>
    </MainLayout>
  );
}
