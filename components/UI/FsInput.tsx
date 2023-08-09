'use state';

import React, { useState } from 'react';
import { IconButton, InputAdornment, StandardTextFieldProps, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormGroups } from '@/types/enums';

export interface FsInputParams extends Omit<StandardTextFieldProps, 'ref'> {
  id: string;
  value?: string;
  label?: string;
  className?: string;
  errorText?: string;
  forwardedRef?: React.Ref<HTMLInputElement>;
  disabled?: boolean;
  focused?: boolean;
  formGroup?: FormGroups;
}

const FsInput: React.FC<FsInputParams> = props => {
  const { id, label, className = '', errorText, value, forwardedRef, formGroup, ...rest } = props;

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <TextField
      {...rest}
      type={showPassword ? 'text' : rest.type || 'text'}
      fullWidth
      className={`fsInput ${className}`}
      label={label || ' '}
      helperText={errorText && rest.error ? errorText : ' '}
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
          rest.type === 'password' ? (
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
