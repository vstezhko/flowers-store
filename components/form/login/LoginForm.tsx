import React from 'react';
import MainPanel from '@/components/form/MainPanel';
import { FormGroups } from '@/types/enums';
import { FormItemFieldsParams } from '@/components/form/FormContainer';

const LoginForm = (data: Record<FormGroups, FormItemFieldsParams[]>) => {
  return (
    <div className='form__content'>
      <div className='layout-2-columns'>
        <MainPanel data={data.login} page='login' />
      </div>
    </div>
  );
};

export default LoginForm;
