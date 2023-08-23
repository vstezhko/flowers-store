import React from 'react';
import Image from 'next/image';
import MainBanner from '@/public/img/jpeg/main-banner.jpg';
import { Box, Paper } from '@mui/material';

const SmallProductCard = () => {
  return (
    <Paper className='small-card'>
      <div className='small-card__image-container'>
        <Image className='small-card__image' src={MainBanner.src} alt='Product photo' layout='fill'></Image>
      </div>
      <div className='small-card__name'>Sample Card Name</div>
      <Box component='div' sx={{ textOverflow: 'ellipsis' }} className='small-card__description'>
        Moved in with your partner? Started a new job? Moved to a different city? New adventures call for special floral
        arrangements. A dreamy and at the same time colorful bouquet in p
      </Box>
      <div className='small-card__price'> From 100€</div>
    </Paper>
  );
};

export default SmallProductCard;
