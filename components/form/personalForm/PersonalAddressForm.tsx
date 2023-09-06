import { formikValuesType, FormItemFieldsParams } from '@/types/types';
import FsInput from '@/components/UI/FsInput';
import * as React from 'react';
import FsSelect from '@/components/UI/FsSelect';
import { ChangeEvent } from 'react';
import FsPhoneInput from '@/components/UI/FsPhoneInput';
import FsCheckbox from '@/components/UI/FsCheckbox';
import { FormikProps } from 'formik';

const PersonalAddressForm = (
  data: FormItemFieldsParams[],
  checked: boolean,
  formik: FormikProps<formikValuesType>,
  onChangeHandler: (e: ChangeEvent) => void,
  modeEdit?: boolean
) => {
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
              onBlur={formik.handleBlur}
              onChange={(e: ChangeEvent) => {
                formik.setFieldTouched('type');
                formik.handleChange(e);
              }}
              name={compoundName}
              id={inputData.name}
              label={inputData.label || ''}
              value={(formik.values[compoundName] as string) || ''}
              formgroup={inputData.formGroup}
              disabled={modeEdit && !checked}
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

        if ('type' in inputData && inputData.type && compoundName && inputData.type === 'phone') {
          return (
            <FsPhoneInput
              id={inputData.name}
              key={inputData.id}
              value={(formik.values[compoundName] as string) || '+48 ___ ___ ___'}
              label={inputData.label || ''}
              type={inputData.type}
              name={compoundName}
              onChange={onChangeHandler}
              onBlur={formik.handleBlur}
              formGroup={inputData.formGroup}
              disabled={modeEdit && !checked}
              errorText={
                (formik.touched[compoundName] || formik.values[compoundName]) && formik.errors[compoundName]
                  ? formik.errors[compoundName]
                  : ' '
              }
              error={
                ((formik.touched[compoundName] || formik.values[compoundName]) &&
                  Boolean(formik.errors[compoundName])) ||
                false
              }
            />
          );
        }
        if ('type' in inputData && inputData.type && compoundName && inputData.type === 'text') {
          return (
            <FsInput
              id={inputData.name}
              key={inputData.id}
              label={inputData.label || ''}
              type={inputData.type}
              name={compoundName}
              onChange={onChangeHandler}
              onBlur={formik.handleBlur}
              value={(formik.values[compoundName] as string) || ''}
              formGroup={inputData.formGroup}
              disabled={modeEdit && !checked}
              errorText={
                (formik.touched[compoundName] || formik.values[compoundName]) && formik.errors[compoundName]
                  ? formik.errors[compoundName]
                  : ' '
              }
              error={
                ((formik.touched[compoundName] || formik.values[compoundName]) &&
                  Boolean(formik.errors[compoundName])) ||
                false
              }
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
                        id={subInput.name}
                        key={subInput.id}
                        value={(formik.values[subCompoundName] as string) || ''}
                        label={subInput.label || ''}
                        type={subInput.type}
                        name={subCompoundName}
                        onChange={onChangeHandler}
                        formGroup={subInput.formGroup}
                        disabled={modeEdit && !checked}
                        errorText={
                          (formik.touched[subCompoundName] || formik.values[subCompoundName]) &&
                          formik.errors[subCompoundName]
                            ? formik.errors[subCompoundName]
                            : ' '
                        }
                        error={
                          ((formik.touched[subCompoundName] || formik.values[subCompoundName]) &&
                            Boolean(formik.errors[subCompoundName])) ||
                          false
                        }
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
              disabled={modeEdit && !checked}
              onToggle={onChangeHandler}
              value={formik.values[compoundName]}
            />
          );
        }
      })}
    </>
  );
};
export default PersonalAddressForm;
