import React from 'react';
import Wing from '@/public/img/png/wing.png';

const TextSignUpPanel = () => {
  return (
    <>
      <p>WeLcome tO FloWers StoRe, </p>
      <div className='panel__item-container'>
        <p>witH</p>
        <img src={Wing.src} alt='wing' />
        <p style={{ alignSelf: 'flex-end' }}>LoVe</p>
      </div>
      <p>VikA, KSenija & ZheNja</p>
    </>
  );
};

export default TextSignUpPanel;
