'use client';
import React from 'react';
import Image from 'next/image';
import MainBanner from '@/public/img/jpeg/banner.jpg';

export default function BannerSection() {
  // const router = useRouter();
  // const handleBtnClick = () => {
  //   router.push('/catalog');
  // };

  return (
    <section className='banner-section'>
      <div className='banner-section__img-container'>
        <Image fill priority={true} src={MainBanner} alt='Welcome' className='banner-section__img' />
        <div className='banner-section__block'>
          <div className='banner-section__block-inner'>
            <h1 className='block-inner__title'>AUTUMN</h1>
            <h2 className='block-inner__subtitle'>SALE</h2>
            <h3 className='block-inner__title'>50% OFF</h3>
            {/*<FsButton className={FsButtonType.BIG} label='Catalog' onClick={handleBtnClick} />*/}
          </div>
        </div>
        {/*<div className='banner-section__content'>*/}
        {/*  <div className='banner-section__text-block'>*/}
        {/*    /!*<h1 className='banner-section__text'>*!/*/}
        {/*    /!*  Welcome to our <span className='highlight'>Flowers Store</span>*!/*/}
        {/*    /!*</h1>*!/*/}
        {/*    /!*<h2 className='banner-section__text'>*!/*/}
        {/*    /!*  Discover a world of <span className='highlight'>fresh and fragrant flowers</span> with us*!/*/}
        {/*    /!*</h2>*!/*/}
        {/*  </div>*/}
        {/*  <FsButton className={FsButtonType.BIG} label='Catalog' onClick={handleBtnClick} />*/}
        {/*</div>*/}
      </div>
    </section>
  );
}
