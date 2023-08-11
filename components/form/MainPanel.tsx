import React from 'react';
import FsInput from '@/components/UI/FsInput';
import TextLoginPanel from '@/components/form/login/TextLoginPanel';
import TextSignUpPanel from '@/components/form/signup/TextSignUpPanel';
import { formikValuesType, FormItemFieldsParams } from '@/components/form/FormContainer';
import { FormikProps } from 'formik';

const MainPanel = ({
  data,
  page,
  formik,
}: {
  data: FormItemFieldsParams[];
  page: string;
  formik: FormikProps<formikValuesType>;
}) => {
  console.log(formik.values);

  return (
    <>
      <div className='panel__item'>
        {data.map(inputData => {
          if ('data' in inputData) {
            return <></>;
          }

          if ('value' in inputData) {
            const { id, value, name, formGroup, ...rest } = inputData;

            const compoundName = `${formGroup}-${name}`;

            return (
              <FsInput
                {...rest}
                id={inputData.id.toString()}
                key={inputData.id}
                name={compoundName}
                value={formik.values[compoundName] || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={(formik.touched[compoundName] && Boolean(formik.errors[compoundName])) || false}
                label={inputData.label || ''}
                formGroup={formGroup}
                errorText={
                  formik.touched[compoundName] && formik.errors[compoundName] ? formik.errors[compoundName] : ' '
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
