import React from 'react';
import FsInput from '@/components/UI/FsInput';
import Wing from '@/public/img/png/wing.png';
import { FormItemFieldsParams } from '@/app/(registration)/signup/page';

const MainPanel = ({ main }: { main: FormItemFieldsParams[] }) => {
  return (
    <>
      <div className='form__fieldset'>
        {main.map((input: FormItemFieldsParams) => (
          <FsInput key={input.id} label={input.label} type={input.type} errorText={'dcfvgbnm'} name={input.name} />
        ))}
      </div>
      <div className='form__fieldset'>
        <p>Welcome to Flowers Store, </p>
        <div className='form__fieldset-container'>
          <p>with</p>
          <img src={Wing.src} alt='wing' />
        </div>
        <p>Vika, Ksenija & Zhenja</p>
      </div>
    </>
  );
};

export default MainPanel;
