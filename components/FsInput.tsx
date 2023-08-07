import React from 'react';
import { StandardTextFieldProps, TextField } from '@mui/material';

export interface FsInputParams extends StandardTextFieldProps {
  value?: string;
  label?: string;
  className?: string;
  errorText?: string;
}

const FsInput: React.FC<FsInputParams> = props => {
  const { label, className = '', errorText, value, ...rest } = props;

  return (
    <TextField
      {...rest}
      value={value}
      fullWidth
      className={`fsInput ${className}`}
      label={label || ' '}
      helperText={errorText && rest.error ? errorText : ' '}
    />
  );
};

export default FsInput;
