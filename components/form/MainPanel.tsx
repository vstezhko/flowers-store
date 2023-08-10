import React from 'react';
import FsInput from '@/components/UI/FsInput';
import TextLoginPanel from '@/components/form/login/TextLoginPanel';
import TextSignUpPanel from '@/components/form/signup/TextSignUpPanel';
import { FormItemFieldsParams } from '@/components/form/FormContainer';

const MainPanel = ({ data, page }: { data: FormItemFieldsParams[]; page: string }) => {
  return (
    <>
      <div className='panel__item'>
        {data.map((input: FormItemFieldsParams) => {
          const { id, ...rest } = input;
          return <FsInput id={input.id.toString()} key={input.id} {...rest} />;
        })}
      </div>
      <div className='panel__item'>
        {page === 'login' && <TextLoginPanel />}
        {page === 'signup' && <TextSignUpPanel />}
      </div>
    </>
  );
};

export default MainPanel;
