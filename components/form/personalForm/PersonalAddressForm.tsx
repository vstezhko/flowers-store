import { formikValuesType, FormItemFieldsParams } from '@/types/types';
import FsInput from '@/components/UI/FsInput';
import * as React from 'react';
import FsSelect from '@/components/UI/FsSelect';
import { ChangeEvent } from 'react';
import FsPhoneInput from '@/components/UI/FsPhoneInput';
import FsCheckbox from '@/components/UI/FsCheckbox';
import { FormikProps } from 'formik';

const PersonalAddressForm = (data: FormItemFieldsParams[], checked: boolean, formik: FormikProps<formikValuesType>) => {
  console.log(formik);
  return (
    <>
      {data?.map((inputData: FormItemFieldsParams) => {
        let compoundName;
        if ('name' in inputData) {
          compoundName = `${inputData.formGroup}-${inputData.name}`;
        }

        if ('type' in inputData && compoundName && inputData.type === 'select' && inputData.options?.length) {
          return (
            <FsSelect
              key={inputData.id}
              options={inputData.options}
              // onBlur={formik.handleBlur}
              onChange={(e: ChangeEvent) => {
                console.log(e);
              }}
              name={compoundName}
              id={inputData.id.toString()}
              label={inputData.label || ''}
              value={inputData.value || null || undefined}
              formgroup={inputData.formGroup}
              disabled={!checked}
            />
          );
        }

        if ('type' in inputData && inputData.type && compoundName && inputData.type === 'phone') {
          return (
            <FsPhoneInput
              id={inputData.id.toString()}
              key={inputData.id}
              value={inputData.value || null || undefined}
              label={inputData.label || ''}
              type={inputData.type}
              name={inputData.name}
              onChange={(e: ChangeEvent) => {
                console.log(e);
              }}
              // onBlur={formik.handleBlur}
              formGroup={inputData.formGroup}
              disabled={!checked}
            />
          );
        }
        if ('type' in inputData && inputData.type && compoundName && inputData.type === 'text') {
          return (
            <FsInput
              id={inputData.id.toString()}
              key={inputData.id}
              label={inputData.label || ''}
              type={inputData.type}
              name={compoundName}
              onChange={(e: ChangeEvent) => {
                console.log(e);
              }}
              value={inputData.value || null || undefined}
              formGroup={inputData.formGroup}
              disabled={!checked}
            />
          );
        }

        if (!('type' in inputData)) {
          return (
            <div className='input__container' key={inputData.id}>
              {'data' in inputData &&
                inputData.data &&
                inputData.data.map(subInput => {
                  let subCompoundName;
                  if ('name' in subInput) {
                    subCompoundName = `${subInput.formGroup}-${subInput.name}`;
                  }

                  if ('value' in subInput && subCompoundName) {
                    return (
                      <FsInput
                        id={subInput.id.toString()}
                        key={subInput.id}
                        value={subInput.value || null || undefined}
                        label={subInput.label || ''}
                        type={subInput.type}
                        name={subCompoundName}
                        onChange={(e: ChangeEvent) => {
                          console.log(e);
                        }}
                        formGroup={subInput.formGroup}
                        disabled={!checked}
                      />
                    );
                  }
                })}
            </div>
          );
        }

        if ('type' in inputData && compoundName && inputData.type === 'checkbox') {
          return (
            <FsCheckbox
              name={compoundName}
              key={inputData.id}
              label={inputData.label}
              checked={!!inputData.value}
              disabled={!checked}
            />
          );
        }
      })}
    </>
  );
};
export default PersonalAddressForm;
