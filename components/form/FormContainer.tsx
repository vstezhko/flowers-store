import React, { ReactNode } from 'react';
import LeafLeft from '@/public/img/png/leaf-left.png';
import LeafRight from '@/public/img/png/leaf-right.png';
import { Paper } from '@mui/material';
import Link from 'next/link';
import Leaf from '@/public/img/png/leaf.png';
import LeafSmall from '@/public/img/png/leaf-small.png';

const FormContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className='form-container__background-img'>
      <div className='background-img background-img_left'>
        <img src={LeafLeft.src} alt='leaf' />
      </div>
      <div className='background-img background-img_right'>
        <img src={LeafRight.src} alt='leaf' />
      </div>
      <Paper elevation={3} className='form__paper'>
        <div className='form__links'>
          <Link href='/'>Home</Link>
          <Link href='/login'>Login</Link>
        </div>
        <img src={Leaf.src} alt='leaf' className='form-img' />
        <img src={LeafSmall.src} alt='leaf' className='form-img-bottom' />
        {children}
      </Paper>
    </div>
  );
};

export default FormContainer;
