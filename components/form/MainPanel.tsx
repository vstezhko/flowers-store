import React from 'react';
import FsInput from '@/components/UI/FsInput';
import { FormItemFieldsParams } from '@/components/form/signup/SignUpForm';
import TextLoginPanel from '@/components/form/login/TextLoginPanel';
import TextSignUpPanel from '@/components/form/signup/TextSignUpPanel';

const MainPanel = ({ data, page }: { data: FormItemFieldsParams[]; page: string }) => {
  return (
    <>
      <div className='panel__item'>
        {data.map((input: FormItemFieldsParams) => (
          <FsInput
            id={input.id.toString()}
            key={input.id}
            label={input.label}
            type={input.type}
            errorText={'dcfvgbnm'}
            name={input.name}
          />
        ))}
      </div>
      <div className='panel__item'>
        {page === 'login' && <TextLoginPanel />}
        {page === 'signup' && <TextSignUpPanel />}
      </div>
    </>
  );
};

export default MainPanel;
