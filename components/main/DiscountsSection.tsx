'use client';

import Image from 'next/image';
import Wing from '@/public/img/png/wing.png';
import FsButton from '@/components/UI/FsButton';
import { FsButtonType } from '@/types/enums';
import DiscountsImg from '@/public/img/jpeg/discounts.jpg';
import React from 'react';
import { useRouter } from 'next/navigation';

const DiscountsSection = () => {
  const router = useRouter();
  return (
    <div className='discounts'>
      <div className='discounts__container-message'>
        <h3>
          RS Student Exclusive! <br /> Get <span> 50% OFF </span>
          on all Bouquets in &apos;MIX&apos; Category with the cart coupon
          <span> &apos;RS&apos; </span>!
        </h3>
        <Image
          src={Wing}
          alt='wing'
          style={{
            height: '50px',
            width: '50px',
            margin: '10px 0',
          }}
        />
        <FsButton className={FsButtonType.MEDIUM} label='catalog' onClick={() => router.push('/catalog')} />
      </div>
      <div className='discounts__container-img'>
        <Image
          className='discounts__img'
          src={DiscountsImg}
          alt='discounts'
          style={{
            minHeight: '100%',
            width: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
};

export default DiscountsSection;
