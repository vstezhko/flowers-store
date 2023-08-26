import React, { ChangeEvent } from 'react';
import FsInput from '@/components/UI/FsInput';
import TextLoginPanel from '@/components/form/login/TextLoginPanel';
import TextSignUpPanel from '@/components/form/signup/TextSignUpPanel';
import { FormikProps } from 'formik';
import { formikValuesType, FormItemFieldsParams } from '@/types/types';

const MainPanel = ({
  data,
  page,
  formik,
}: {
  data: FormItemFieldsParams[];
  page: string;
  formik: FormikProps<formikValuesType>;
}) => {
  const onChangeHandler = (e: ChangeEvent<any>) => {
    formik.setFieldTouched('type');
    formik.handleChange(e);
  };
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
                id={inputData.name}
                key={inputData.id}
                name={compoundName}
                value={(formik.values[compoundName] as string) || ''}
                onChange={onChangeHandler}
                onBlur={formik.handleBlur}
                label={inputData.label || ''}
                formGroup={formGroup}
                error={
                  ((formik.touched[compoundName] || formik.values[compoundName]) &&
                    Boolean(formik.errors[compoundName])) ||
                  false
                }
                errorText={
                  (formik.touched[compoundName] || formik.values[compoundName]) && formik.errors[compoundName]
                    ? formik.errors[compoundName]
                    : ' '
                }
              />
            );
          }
        })}
      </div>
      <div className='panel__item panel__text text'>
        {page === 'login' && <TextLoginPanel />}
        {page === 'signup' && <TextSignUpPanel />}
      </div>
    </>
  );
};

export default MainPanel;
