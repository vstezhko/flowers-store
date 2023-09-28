import React from 'react';
import MainPanel from '@/components/form/MainPanel';
import { FormGroups } from '@/types/enums';
import { FormikProps } from 'formik';
import { formikValuesType, FormItemFieldsParams } from '@/types/types';

const LoginForm = (data: Record<FormGroups, FormItemFieldsParams[]>, formik: FormikProps<formikValuesType>) => {
  return (
    <div className='form__content'>
      <div className='layout-2-columns'>
        <MainPanel data={data.login} page='login' formik={formik} />
      </div>
    </div>
  );
};

export default LoginForm;
