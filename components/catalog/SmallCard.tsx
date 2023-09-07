import React, { FC, useState } from 'react';
import Image from 'next/image';
import { Box, Button, Paper } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import noImage from '@/public/img/jpeg/no-image.jpg';
import Link from 'next/link';

interface SmallProductCardParams {
  id: string;
  productName: string;
  description: string;
  price: number;
  discounted?: number | undefined;
  currency: string;
  image: string;
}

const SmallProductCard: FC<SmallProductCardParams> = ({
  id,
  productName,
  description,
  price,
  discounted,
  currency,
  image,
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
            fill
            sizes='(max-width: 768px) 250px, 263px'
          />
        </div>
        <div className='small-card__text-content'>
          <div className='small-card__name'>{productName}</div>
          <Box component='div' sx={{ textOverflow: 'ellipsis' }} className='small-card__description'>
            {description}
          </Box>
          <div className='small-card__details'>
            <div className='small-card__price'>
              <div className='small-card__final-price'>
                {`${((discounted ?? price) / 100).toFixed(2)} ${currency}`.replace('EUR', '€') || 'Upon request'}
              </div>
              {discounted !== undefined && (
                <div className='small-card__initial-price'>
                  {`${(price / 100).toFixed(2)} ${currency}`.replace('EUR', '€')}
                </div>
              )}
            </div>
            <Button className='small-card__button' variant='outlined'>
              <AddShoppingCartIcon className='small-card__icon' />
            </Button>
          </div>
        </div>
      </Paper>
    </Link>
  );
};

export default SmallProductCard;
