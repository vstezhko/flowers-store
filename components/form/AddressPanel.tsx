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
              onChange={formik.handleChange}
              name={compoundName}
              id={inputData.id.toString()}
              label={inputData.label || ''}
              value={formik.values[compoundName]}
              formgroup={inputData.formGroup}
              error={(formik.touched[compoundName] && Boolean(formik.errors[compoundName])) || false}
              errorText={
                formik.touched[compoundName] && formik.errors[compoundName] ? formik.errors[compoundName] : ' '
              }
              disabled={disabled}
            />
          );
        }

        return 'type' in inputData && inputData.type && compoundName ? (
          inputData.type !== 'phone' ? (
            <FsInput
              id={inputData.id.toString()}
              key={inputData.id}
              label={inputData.label || ''}
              type={inputData.type}
              name={compoundName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[compoundName]}
              errorText={
                formik.touched[compoundName] && formik.errors[compoundName] ? formik.errors[compoundName] : ' '
              }
              error={(formik.touched[compoundName] && Boolean(formik.errors[compoundName])) || false}
              formGroup={inputData.formGroup}
              disabled={disabled}
            />
          ) : (
            <FsPhoneInput
              id={inputData.id.toString()}
              key={inputData.id}
              value={formik.values[compoundName] || '+48 ___ ___ ___'}
              label={inputData.label || ''}
              type={inputData.type}
              name={inputData.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorText={
                formik.touched[compoundName] && formik.errors[compoundName] ? formik.errors[compoundName] : ' '
              }
              error={(formik.touched[compoundName] && Boolean(formik.errors[compoundName])) || false}
              formGroup={inputData.formGroup}
              disabled={disabled}
            />
          )
        ) : (
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
                      value={formik.values[subCompoundName] || ''}
                      label={subInput.label || ''}
                      type={subInput.type}
                      name={subCompoundName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorText={
                        formik.touched[subCompoundName] && formik.errors[subCompoundName]
                          ? formik.errors[subCompoundName]
                          : ' '
                      }
                      error={(formik.touched[subCompoundName] && Boolean(formik.errors[subCompoundName])) || false}
                      formGroup={subInput.formGroup}
                      disabled={disabled}
                    />
                  );
                }
              })}
          </div>
        );
      })}
      <FsCheckbox label='set as default billing address' />
    </>
  );
};

export default AddressPanel;
