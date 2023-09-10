import React from 'react';
import Image from 'next/image';
import EmptyCartImg from '@/public/img/jpeg/empty-cart.jpg';
import FsButton from '@/components/UI/FsButton';
import { FsButtonType } from '@/types/enums';
import { useRouter } from 'next/navigation';

const EmptyCart = () => {
  const router = useRouter();
  const handleBtnClick = () => {
    router.push('/catalog');
  };
  return (
    <div className='empty-cart'>
      <div className='empty-cart__container-message'>
        <h3>Your Cart is Waiting for Blossoms!</h3>
        <h3>Start Shopping Now!</h3>
        <FsButton className={FsButtonType.MEDIUM} label='Catalog' onClick={handleBtnClick} />
      </div>
      <div className='empty-cart__container-img'>
        <Image
          className='empty-cart__img'
          src={EmptyCartImg}
          alt='Empty cart'
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

export default EmptyCart;
