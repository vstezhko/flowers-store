'use client';
import LeafLeft from '@/public/img/png/leaf-left.png';
import LeafRight from '@/public/img/png/leaf-right.png';
import Leaf from '@/public/img/png/leaf.png';
import { Paper } from '@mui/material';

const Login = () => {
  return (
    <div className='login__background-img'>
      <div className='background-img background-img_left'>
        <img src={LeafLeft.src} alt='leaf' />
      </div>
      <div className='background-img background-img_right'>
        <img src={LeafRight.src} alt='leaf' />
      </div>
      <Paper elevation={3}>
        <form className='login__form'>
          <img src={Leaf.src} alt='leaf' className='form-img' />
        </form>
      </Paper>
    </div>
  );
};

export default Login;
