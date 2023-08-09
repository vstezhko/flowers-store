import React from 'react';
import { SvgIcon } from '@mui/material';
import { IconParams } from '@/types/interface';

const PlusIcon = (props: IconParams) => (
  <SvgIcon {...props} sx={{ width: '9px', height: '9px', stroke: '#FFFFFF' }} viewBox='0 0 9 9' strokeWidth='2'>
    <path xmlns='http://www.w3.org/2000/svg' id='Vector' d='M0 4.5H9M4.5 9L4.5 0' />
  </SvgIcon>
);

export default PlusIcon;
