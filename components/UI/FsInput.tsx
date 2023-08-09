import React, { useState } from 'react';
import { IconButton, InputAdornment, StandardTextFieldProps, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export interface FsInputParams extends Omit<StandardTextFieldProps, 'ref'> {
  value?: string;
  label?: string;
  className?: string;
  errorText?: string;
  forwardedRef?: React.Ref<HTMLInputElement>;
}

const FsInput: React.FC<FsInputParams> = props => {
  const { label, className = '', errorText, value, forwardedRef, ...rest } = props;

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <TextField
      {...rest}
      type={showPassword ? 'text' : rest.type || 'text'}
      fullWidth
      // ref={forwardedRef}
      className={`fsInput ${className}`}
      label={label || ' '}
      helperText={errorText && rest.error ? errorText : ' '}
      InputProps={{
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
