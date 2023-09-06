import FsInput from '@/components/UI/FsInput';
import * as React from 'react';
import { formikValuesType, FormItemFieldsParams } from '@/types/types';
import { FormikProps } from 'formik';
import { ChangeEvent } from 'react';

const PersonalInfoForm = (
  data: FormItemFieldsParams[],
  checked: boolean,
  formik: FormikProps<formikValuesType>,
  onChangeHandler: (e: ChangeEvent) => void,
  modeEdit: boolean | undefined
) => {
  return (
    <>
      {data?.map(inputData => {
        if ('value' in inputData) {
          const { id, value, name, formGroup, ...rest } = inputData;
          const compoundName = `${formGroup}-${name}`;
          const error =
            (formik.touched[compoundName] || formik.values[compoundName]) && Boolean(formik.errors[compoundName]);
          const errorText =
            (formik.touched[compoundName] || formik.values[compoundName]) && formik.errors[compoundName]
              ? formik.errors[compoundName]
              : ' ';
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
              disabled={modeEdit ? !checked : false}
              error={error || false}
              errorText={errorText}
            />
          );
        }
      })}
    </>
  );
};
export default PersonalInfoForm;
