'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import MainBanner from '@/public/img/jpeg/main-banner.jpg';
import { FsButtonType } from '@/types/enums';
import FsButton from '@/components/UI/FsButton';

export default function BannerSection() {
  const router = useRouter();
  const handleBtnClick = () => {
    router.push('/catalog');
  };

  return (
    <section className='banner-section'>
      <div className='banner-section__img-container'>
        <Image fill src={MainBanner} alt='Welcome' className='banner-section__img' />
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
      </div>
    </section>
  );
}
