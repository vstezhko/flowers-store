import React from 'react';
import Wing from '@/public/img/png/wing.png';
import Image from 'next/image';

const TextSignUpPanel = () => {
  return (
    <>
      <p>WeLcome tO FloWers StoRe, </p>
      <div className='panel__item-container'>
        <p>witH</p>
        <Image src={Wing} alt={'Wing'} loading='lazy' />
        <p style={{ alignSelf: 'flex-end' }}>LoVe</p>
      </div>
      <p>VikA, KSenija & ZheNja</p>
    </>
  );
};

export default TextSignUpPanel;
