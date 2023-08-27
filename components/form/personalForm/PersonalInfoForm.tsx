import FsInput from '@/components/UI/FsInput';
import * as React from 'react';
import { formikValuesType, FormItemFieldsParams } from '@/types/types';
import { FormikProps } from 'formik';
import { ChangeEvent } from 'react';

const PersonalInfoForm = (data: FormItemFieldsParams[], checked: boolean, formik: FormikProps<formikValuesType>) => {
  const onChangeHandler = (e: ChangeEvent<any>) => {
    formik.setFieldTouched('type');
    formik.handleChange(e);
  };

  return (
    <>
      {data?.map(inputData => {
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
              label={inputData.label || ''}
              formGroup={formGroup}
              disabled={!checked}
            />
          );
        }
      })}
    </>
  );
};
export default PersonalInfoForm;
