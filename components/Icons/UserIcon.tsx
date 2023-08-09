import React from 'react';
import { SvgIcon } from '@mui/material';

const UserIcon = (props: object) => (
  <SvgIcon {...props} sx={{ width: '25px', height: '25px' }} viewBox='0 0 25 25' className='nav-icon'>
    <rect x='0.75' y='0.75' width='23.386' height='23.386' rx='11.693' stroke='#5B4A58' strokeWidth='1.5' fill='none' />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M6.38552 17.0178C7.16323 16.2401 8.21803 15.8032 9.31788 15.8032H15.9531C17.0529 15.8032 18.1077 16.2401 18.8854 17.0178C19.6631 17.7956 20.1 18.8504 20.1 19.9502V21.609C20.1 22.0671 19.7287 22.4384 19.2706 22.4384C18.8126 22.4384 18.4412 22.0671 18.4412 21.609V19.9502C18.4412 19.2903 18.1791 18.6574 17.7125 18.1908C17.2458 17.7242 16.613 17.462 15.9531 17.462H9.31788C8.65797 17.462 8.02509 17.7242 7.55847 18.1908C7.09184 18.6574 6.82969 19.2903 6.82969 19.9502V21.609C6.82969 22.0671 6.45836 22.4384 6.00029 22.4384C5.54223 22.4384 5.1709 22.0671 5.1709 21.609V19.9502C5.1709 18.8504 5.60781 17.7956 6.38552 17.0178Z'
      fill='#5B4A58'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12.6358 7.50938C11.2616 7.50938 10.1476 8.62338 10.1476 9.99757C10.1476 11.3718 11.2616 12.4858 12.6358 12.4858C14.0099 12.4858 15.1239 11.3718 15.1239 9.99757C15.1239 8.62338 14.0099 7.50938 12.6358 7.50938ZM8.48877 9.99757C8.48877 7.70725 10.3454 5.85059 12.6358 5.85059C14.9261 5.85059 16.7827 7.70725 16.7827 9.99757C16.7827 12.2879 14.9261 14.1446 12.6358 14.1446C10.3454 14.1446 8.48877 12.2879 8.48877 9.99757Z'
      fill='#5B4A58'
    />
  </SvgIcon>
);

export default UserIcon;