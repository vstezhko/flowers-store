import React from 'react';
import MainPanel from '@/components/form/MainPanel';
import { FormGroups } from '@/types/enums';
import { formikValuesType, FormItemFieldsParams } from '@/components/form/FormContainer';
import { FormikProps } from 'formik';

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
