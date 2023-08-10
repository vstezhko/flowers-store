/* eslint-disable unicorn/filename-case */
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import NotFoundImg from '@/public/img/png/not-found.png';
import FsButton from '@/components/UI/FsButton';
import { FsButtonType } from '@/types/enums';

export default function NotFound() {
  const router = useRouter();
  const handleBtnClick = () => {
    router.push('/');
  };
  return (
    <section className='error'>
      <div className='error__container'>
        <div className='error__img-container'>
          <Image className='error__img' fill={true} src={NotFoundImg.src} alt='Not found' />
        </div>
        <div className='error__text-block'>
          <h1>Oops... Something went wrong</h1>
          <h3>
            It looks like the page you&apos;re looking for wasn&apos;t found. While we&apos;re fixing it, check out our
            Home page.
          </h3>
        </div>
        <FsButton onClick={handleBtnClick} label='Home' className={FsButtonType.BIG} />
      </div>
    </section>
  );
}
