import React from 'react';
import Wing from '@/public/img/png/wing.png';
import Image from 'next/image';

const TextLoginPanel = () => {
  return (
    <>
      <p>WeLcome Back,</p>
      <div className='panel__item-container'>
        <p>FrienD</p>
        <Image src={Wing} alt={'Wing'} width={30} />
        <p>!</p>
      </div>
      <p>YouR BloomS</p>
      <p>are juSt a Login away :)</p>
    </>
  );
};

export default TextLoginPanel;
