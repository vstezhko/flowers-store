import React, { ForwardRefExoticComponent, InputHTMLAttributes, RefAttributes, useState } from 'react';
import { IconButton, InputAdornment, StandardTextFieldProps, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormGroups, ValidationRuleGroup } from '@/types/enums';
import { FormikProps } from 'formik';
import { formikValuesType } from '@/types/types';
import { MaskProps } from '@react-input/mask';

export interface FsInputParams extends Omit<StandardTextFieldProps, 'ref'> {
  id: string;
  name: string;
  value?: string;
  label: string;
  className?: string;
  errorText?: string | undefined;
  disabled?: boolean;
  focused?: boolean;
  formGroup?: FormGroups;
  validationRuleGroup?: ValidationRuleGroup;
  onChange: FormikProps<formikValuesType>['handleChange'];
  onBlur?: FormikProps<formikValuesType>['handleBlur'];
  inputComponent?: ForwardRefExoticComponent<
    MaskProps & { component?: undefined } & InputHTMLAttributes<HTMLInputElement> & RefAttributes<HTMLInputElement>
  >;
}

const FsInput: React.FC<FsInputParams> = props => {
  const {
    id,
    name,
    label,
    className = '',
    errorText,
    value,
    formGroup,
    validationRuleGroup,
    onChange,
    onBlur,
    type,
    disabled,
    inputComponent,
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
      disabled={disabled}
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
        inputComponent: inputComponent,
        endAdornment:
          type === 'password' ? (
            <InputAdornment position='end'>
              <IconButton onClick={handleTogglePassword} edge='end' style={{ color: '#5B4A58' }}>
                {!showPassword ? <VisibilityOff /> : <Visibility />}
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
