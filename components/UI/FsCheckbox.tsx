import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabelProps } from '@mui/material/FormControlLabel/FormControlLabel';

export interface FsCheckboxParams extends Omit<FormControlLabelProps, 'control'> {
  onToggle?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const FsCheckbox: React.FC<FsCheckboxParams> = props => {
  let { className, value, onToggle, ...rest } = props;

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof onToggle === 'function') {
      onToggle(event);
    }
  };

  return (
    <FormControlLabel
      control={<Checkbox checked={!!value} onChange={handleCheckboxChange} color={!!value ? 'success' : 'default'} />}
      {...rest}
      className={`fsCheckbox ${className}`}
    />
  );
};

export default FsCheckbox;
