import React from 'react';
import { SvgIcon } from '@mui/material';
import { IconParams } from '@/types/interface';

const MinusIcon = (props: IconParams) => (
  <SvgIcon
    {...props}
    sx={{ width: '9px', height: '9px', stroke: 'rgb(255, 255, 255)' }}
    viewBox='0 0 9 2'
    stroke-width='2'>
    <line xmlns='http://www.w3.org/2000/svg' y1='1' x2='9' y2='1' />
  </SvgIcon>
);

export default MinusIcon;
