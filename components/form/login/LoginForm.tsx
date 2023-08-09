import React from 'react';
import { FormItemFieldsParams } from '@/components/form/signup/SignUpForm';
import MainPanel from '@/components/form/MainPanel';

const userLoginFields: FormItemFieldsParams[] = [
  {
    id: 1,
    name: 'email',
    type: 'text',
    label: 'email',
    value: '',
  },
  {
    id: 2,
    name: 'password',
    type: 'password',
    label: 'password',
    value: '',
  },
];
const LoginForm = () => {
  return (
    <div className='form__content'>
      <div className='layout-2-columns'>
        <MainPanel data={userLoginFields} page='login' />
      </div>
    </div>
  );
};

export default LoginForm;
