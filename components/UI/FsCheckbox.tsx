import React, { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabelProps } from '@mui/material/FormControlLabel/FormControlLabel';

export interface FsCheckboxParams extends Omit<FormControlLabelProps, 'control'> {
  onToggle?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const FsCheckbox: React.FC<FsCheckboxParams> = props => {
  let { className, checked, onToggle, ...rest } = props;

  const [isChecked, setIsChecked] = useState(checked || false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked); // Update the state when the checkbox is clicked
    if (typeof onToggle === 'function') {
      onToggle(event);
    }
  };

  return (
    <FormControlLabel
      control={
        <Checkbox checked={isChecked} onChange={handleCheckboxChange} color={isChecked ? 'success' : 'default'} />
      }
      {...rest}
      className={`fsCheckbox ${className}`}
    />
  );
};

export default FsCheckbox;
