import { FormHelperText, InputLabel, MenuItem, Select, SelectProps } from '@mui/material';
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
  const { id, name, label, error, value, onChange, onBlur, options, className, errorText, disabled, ...rest } = props;
  return (
    <div className={`fsSelect__container fsSelect ${className}`}>
      <InputLabel variant='standard' htmlFor={name} className={error ? 'Mui-error' : ''} disabled={disabled}>
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
        disabled={disabled}
        {...rest}>
        {options?.map((opt: string, index: number) => (
          <MenuItem key={index} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText id={id}>{errorText}</FormHelperText>
    </div>
  );
};

export default FsSelect;
