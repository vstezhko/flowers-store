import React, { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabelProps } from '@mui/material/FormControlLabel/FormControlLabel';

export interface FsCheckboxParams extends Omit<FormControlLabelProps, 'control'> {
  className?: string;
}

const FsCheckbox: React.FC<FsCheckboxParams> = props => {
  const { className, checked, ...rest } = props;

  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked); // Update the state when the checkbox is clicked
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
