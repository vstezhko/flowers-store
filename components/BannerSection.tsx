'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import MainBanner from '@/public/img/jpeg/main-banner.jpg';
import FsButton from './FsButton';
import { menuItems } from './Header';
import { FsButtonType } from '@/types/enums';

export default function BannerSection() {
  const router = useRouter();
  const handleBtnClick = () => {
    router.push('/catalog');
  };
  const catalog = menuItems.find(item => item.title === 'Catalog');

  if (!catalog) {
    // Add redirection to the NotFound page;
    throw new Error('Catalog is not found');
  }

  return (
    <section className='banner-section'>
      <Image fill={true} src={MainBanner.src} alt='Welcome' className='banner-section__img' />
      <div className='banner-section__content'>
        <div className='banner-section__text-block'>
          <h1 className='banner-section__text'>
            Welcome to our <span className='highlight'>flowers store</span>
          </h1>
          <h2 className='banner-section__text'>
            Discover a world of <span className='highlight'>fresh and fragrant flowers</span> with us
          </h2>
        </div>
        <FsButton className={FsButtonType.BIG} label='Catalog' onClick={handleBtnClick} />
      </div>
    </section>
  );
}
