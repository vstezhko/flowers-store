import React from 'react';
import Image from 'next/image';
import { Box, Paper } from '@mui/material';

const SmallProductCard = ({
  productName,
  description,
  price,
  image,
}: {
  productName: string;
  description: string;
  price: string;
  image: string;
}) => {
  return (
    <Paper className='small-card'>
      <div className='small-card__image-container'>
        <Image className='small-card__image' src={image} alt='Product photo' layout='fill'></Image>
      </div>
      <div className='small-card__name'>{productName}</div>
      <Box component='div' sx={{ textOverflow: 'ellipsis' }} className='small-card__description'>
        {description}
      </Box>
      <div className='small-card__price'>{price}</div>
    </Paper>
  );
};

export default SmallProductCard;
