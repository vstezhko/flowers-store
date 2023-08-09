import React from 'react';
import FsInput from '@/components/UI/FsInput';
import Wing from '@/public/img/png/wing.png';
import { FormItemFieldsParams } from '@/components/form/FormContainer';

const MainPanel = ({ main }: { main: FormItemFieldsParams[] }) => {
  return (
    <>
      <div className='signup__item'>
        {main.map((input: FormItemFieldsParams) => {
          const { id, ...rest } = input;
          return <FsInput id={input.id.toString()} key={input.id} {...rest} />;
        })}
      </div>
      <div className='signup__item'>
        <p>WeLcome tO FloWers StoRe, </p>
        <div className='signup__item-container'>
          <p>witH</p>
          <img src={Wing.src} alt='wing' />
          <p style={{ alignSelf: 'flex-end' }}>LoVe</p>
        </div>
        <p>VikA, KSenija & ZheNja</p>
      </div>
    </>
  );
};

export default MainPanel;
