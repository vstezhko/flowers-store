import FsInput from '@/components/UI/FsInput';
import * as React from 'react';
import { formikValuesType, FormItemFieldsParams } from '@/types/types';
import { FormikProps } from 'formik';
import { ChangeEvent } from 'react';

const PersonalInfoForm = (
  data: FormItemFieldsParams[],
  checked: boolean,
  formik: FormikProps<formikValuesType>,
  onChangeHandler: (e: ChangeEvent<any>) => void
) => {
  console.log(data);
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
              onBlur={formik.handleBlur}
              value={(formik.values[compoundName] as string) || ''}
              onChange={onChangeHandler}
              label={inputData.label || ''}
              formGroup={formGroup}
              disabled={!checked}
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
    </>
  );
};
export default PersonalInfoForm;
