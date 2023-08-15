import { InputLabel, MenuItem, Select, SelectProps } from '@mui/material';
import React from 'react';
import { FormGroups, ValidationRuleGroup } from '@/types/enums';
import { FormikProps } from 'formik';
import { formikValuesType } from '@/components/form/FormContainer';

export interface FsSelectParams extends Omit<SelectProps, 'ref'> {
  id: string;
  name: string;
  value?: string;
  label: string;
  className?: string;
  errorText?: string | undefined;
  forwardedRef?: React.Ref<HTMLInputElement>;
  disabled?: boolean;
  focused?: boolean;
  validationRuleGroup?: ValidationRuleGroup;
  onChange: FormikProps<formikValuesType>['handleChange'];
  onBlur: FormikProps<formikValuesType>['handleBlur'];
  options: string[];
  formgroup: FormGroups;
  error: boolean;
}

const FsSelect: React.FC<FsSelectParams> = props => {
  const { id, name, label, error, value, onChange, onBlur, options, className, errorText, ...rest } = props;
  return (
    <div className={`fsSelect__container fsSelect ${className}`}>
      <InputLabel variant='standard' htmlFor={name} className={error ? 'Mui-error' : ''}>
        {label}
      </InputLabel>
      <Select
        name={name}
        labelId={id}
        id={id}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        className={error ? 'Mui-error' : ''}
        {...rest}>
        {options?.map((opt: string, index: number) => (
          <MenuItem key={index} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>
      <p
        className='MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained MuiFormHelperText-filled css-rmhgeq-MuiFormHelperText-root'
        id={id}>
        {errorText}
      </p>
    </div>
  );
};

export default FsSelect;
