import React, { ChangeEvent } from 'react';
import FsInput from '@/components/UI/FsInput';
import FsPhoneInput from '@/components/UI/FsPhoneInput';
import FsCheckbox from '@/components/UI/FsCheckbox';
import { formikValuesType, FormItemFieldsParams } from '@/components/form/FormContainer';
import { FormikProps } from 'formik';
import FsSelect from '@/components/UI/FsSelect';
import { useCallback, useEffect } from 'react';
import { FormGroups } from '@/types/enums';

const AddressPanel = ({
  data,
  title,
  formik,
  disabled,
  setIsValid,
}: {
  data: FormItemFieldsParams[];
  title: string;
  formik: FormikProps<formikValuesType>;
  disabled?: boolean;
  setIsValid?: (isValid: boolean) => void;
}) => {
  const isFieldValid = useCallback(
    (fieldName: string) => {
      if (fieldName === 'shippingAddress-default') {
        return !Boolean(formik.errors[fieldName]);
      }

      return !Boolean(formik.errors[fieldName]) && formik.values[fieldName] !== '';
    },
    [formik.errors, formik.values]
  );

  const checkAddressValidity = useCallback(() => {
    let isPanelValid = true;

    for (const inputData of data) {
      let compoundName;
      if ('name' in inputData && inputData.formGroup === FormGroups.SHIPPING_ADDRESS) {
        compoundName = `${inputData.formGroup}-${inputData.name}`;
        if (!isFieldValid(compoundName)) {
          isPanelValid = false;
          break;
        }
      }

      if ('data' in inputData && inputData.data) {
        for (const subInput of inputData.data) {
          if ('name' in subInput) {
            const subCompoundName = `${subInput.formGroup}-${subInput.name}`;
            if (!isFieldValid(subCompoundName)) {
              isPanelValid = false;
              break;
            }
          }
        }
      }
    }

    return isPanelValid;
  }, [data, isFieldValid]);

  useEffect(() => {
    const isValid = checkAddressValidity();
    if (setIsValid) {
      setIsValid(isValid);
    }
  }, [checkAddressValidity, setIsValid]);

  const onChangeHandler = (e: ChangeEvent<any>) => {
    formik.setFieldTouched('type');
    formik.handleChange(e);
  };

  return (
    <>
      <h5>{title}</h5>
      {data.map((inputData: FormItemFieldsParams) => {
        let compoundName;
        if ('name' in inputData) {
          compoundName = `${inputData.formGroup}-${inputData.name}`;
        }

        if ('type' in inputData && compoundName && inputData.type === 'select' && inputData.value?.length) {
          return (
            <FsSelect
              key={inputData.id}
              options={inputData.value}
              onBlur={formik.handleBlur}
              onChange={(e: ChangeEvent) => {
                formik.setFieldTouched('type');
                formik.handleChange(e);
              }}
              name={compoundName}
              id={inputData.id.toString()}
              label={inputData.label || ''}
              value={formik.values[compoundName] as string}
              formgroup={inputData.formGroup}
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
              disabled={disabled}
            />
          );
        }

        if ('type' in inputData && inputData.type && compoundName && inputData.type === 'phone') {
          return (
            <FsPhoneInput
              id={inputData.id.toString()}
              key={inputData.id}
              value={(formik.values[compoundName] as string) || '+48 ___ ___ ___'}
              label={inputData.label || ''}
              type={inputData.type}
              name={inputData.name}
              onChange={onChangeHandler}
              onBlur={formik.handleBlur}
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
              formGroup={inputData.formGroup}
              disabled={disabled}
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
              onChange={onChangeHandler}
              onBlur={formik.handleBlur}
              value={formik.values[compoundName] as string}
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
              formGroup={inputData.formGroup}
              disabled={disabled}
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
                        value={(formik.values[subCompoundName] as string) || ''}
                        label={subInput.label || ''}
                        type={subInput.type}
                        name={subCompoundName}
                        onChange={onChangeHandler}
                        onBlur={formik.handleBlur}
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
                        formGroup={subInput.formGroup}
                        disabled={disabled}
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
              onToggle={formik.handleChange}
              onBlur={formik.handleBlur}
              label={inputData.label}
              value={formik.values[compoundName]}
            />
          );
        }
      })}
    </>
  );
};

export default AddressPanel;
