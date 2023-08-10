import React from 'react';
import FsInput from '@/components/UI/FsInput';
import TextLoginPanel from '@/components/form/login/TextLoginPanel';
import TextSignUpPanel from '@/components/form/signup/TextSignUpPanel';
import { formikValuesType, FormItemFieldsParams } from '@/components/form/FormContainer';
import { FormikProps } from 'formik';
import { FormGroups } from '@/types/enums';

const MainPanel = ({
  data,
  page,
  formik,
}: {
  data: FormItemFieldsParams[];
  page: string;
  formik: FormikProps<formikValuesType>;
}) => {
  console.log('errors', formik.errors);
  console.log('touched', formik.touched);

  return (
    <>
      <div className='panel__item'>
        {data.map(inputData => {
          if ('data' in inputData) {
            return <></>;
          }

          if ('value' in inputData) {
            const { id, value, name, ...rest } = inputData;

            return (
              <FsInput
                id={inputData.id.toString()}
                key={inputData.id}
                name={name}
                value={formik.values[FormGroups.CUSTOMER][inputData.name] || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched[FormGroups.CUSTOMER] && formik.errors[FormGroups.CUSTOMER]
                    ? formik.touched[FormGroups.CUSTOMER][inputData.name] &&
                      Boolean(formik.errors[FormGroups.CUSTOMER][inputData.name])
                    : false
                }
                label={inputData.label || ''}
                {...rest}
                errorText={
                  formik.touched[FormGroups.CUSTOMER] && formik.errors[FormGroups.CUSTOMER]
                    ? formik.touched[FormGroups.CUSTOMER][inputData.name] &&
                      formik.errors[FormGroups.CUSTOMER][inputData.name]
                      ? formik.errors[FormGroups.CUSTOMER][inputData.name]
                      : ' '
                    : ' '
                }
              />
            );
          }
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
