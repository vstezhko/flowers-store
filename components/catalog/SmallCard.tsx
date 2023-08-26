import React, { useState } from 'react';
import Image from 'next/image';
import { Box, Button, Paper } from '@mui/material';
import noImage from '@/public/img/jpeg/no-image.jpg';
import Link from 'next/link';

const SmallProductCard = ({
  id,
  productName,
  description,
  price,
  image,
}: {
  id: string;
  productName: string;
  description: string;
  price: string;
  image: string;
}) => {
  const [src, setSrc] = useState(image);

  return (
    <Link href={`/catalog/product/${id}`}>
      <Paper className='small-card'>
        <div className='small-card__image-container'>
          <Image
            className='small-card__image'
            src={src}
            onError={() => setSrc(noImage.src)}
            alt='Product photo'
            layout='fill'></Image>
        </div>
        <div className='small-card__text-content'>
          <div className='small-card__name'>{productName}</div>
          <Box component='div' sx={{ textOverflow: 'ellipsis' }} className='small-card__description'>
            {description}
          </Box>
          <div className='small-card__details'>
            <div className='small-card__price'>{price.replace('EUR', '€')}</div>
            <Button className='small-card__button' variant='outlined'>
              More
            </Button>
          </div>
        </div>
      </Paper>
    </Link>
  );
};

export default SmallProductCard;
