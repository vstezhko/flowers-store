'use state';

import React, { useState } from 'react';
import { IconButton, InputAdornment, StandardTextFieldProps, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormGroups, ValidationRuleGroup } from '@/types/enums';
import { FormikProps } from 'formik';
import { formikValuesType } from '@/components/form/FormContainer';

export interface FsInputParams extends Omit<StandardTextFieldProps, 'ref'> {
  id: string;
  name: string;
  value?: string;
  label: string;
  className?: string;
  errorText: string | undefined;
  forwardedRef?: React.Ref<HTMLInputElement>;
  disabled?: boolean;
  focused?: boolean;
  formGroup: FormGroups;
  validationRuleGroup?: ValidationRuleGroup;
  onChange: FormikProps<formikValuesType>['handleChange'];
  onBlur: FormikProps<formikValuesType>['handleBlur'];
}

const FsInput: React.FC<FsInputParams> = props => {
  const {
    id,
    name,
    label,
    className = '',
    errorText,
    value,
    forwardedRef,
    formGroup,
    validationRuleGroup,
    onChange,
    onBlur,
    type,
    ...rest
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <TextField
      name={name}
      label={label || ' '}
      type={showPassword ? 'text' : type || 'text'}
      onBlur={onBlur}
      value={value || ''}
      onChange={onChange}
      fullWidth
      className={`fsInput ${className}`}
      helperText={errorText}
      {...rest}
      InputLabelProps={{
        id: id,
        htmlFor: id,
      }}
      FormHelperTextProps={{
        id: id,
      }}
      InputProps={{
        'aria-describedby': id,
        id: id,
        inputRef: forwardedRef,
        endAdornment:
          type === 'password' ? (
            <InputAdornment position='end'>
              <IconButton onClick={handleTogglePassword} edge='end' style={{ color: '#5B4A58' }}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : (
            ''
          ),
      }}
    />
  );
};

export default FsInput;
