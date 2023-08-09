import React from 'react';
import Wing from '@/public/img/png/wing.png';

const TextLoginPanel = () => {
  return (
    <>
      <p>WeLcome Back,</p>
      <div className='panel__item-container'>
        <p>FrienD</p>
        <img src={Wing.src} alt='wing' width={30} />
        <p>!</p>
      </div>
      <p>YouR BloomS</p>
      <p>are juSt a Login away :)</p>
    </>
  );
};

export default TextLoginPanel;
