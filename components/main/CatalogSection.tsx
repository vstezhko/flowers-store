'use client';
import React from 'react';
import { FsButtonType } from '@/types/enums';
import FsButton from '@/components/UI/FsButton';
import { useRouter } from 'next/navigation';

const CatalogSection = () => {
  const router = useRouter();
  const handleBtnClick = () => {
    router.push('/catalog');
  };
  return (
    <section className='catalog__section'>
      <h3>Explore the world of flowers in our catalog!</h3>
      <FsButton className={FsButtonType.BIG} label='Catalog' onClick={handleBtnClick} />
    </section>
  );
};

export default CatalogSection;
