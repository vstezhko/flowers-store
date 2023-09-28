import React, { FC, useState } from 'react';
import Image from 'next/image';
import { Box, Paper, Tooltip } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import noImage from '@/public/img/jpeg/no-image.jpg';
import Link from 'next/link';
import { useDispatch } from '@/redux/store';
import { CurrencyParams } from '@/types/enums';
import LoadingButton from '@mui/lab/LoadingButton';
import { cartInteraction } from '@/utils/cartInteraction';
import { LineItem } from '@/api/services/Cart.services';

interface SmallProductCardParams {
  id: string;
  productName: string;
  description: string;
  price: number;
  discounted?: number | undefined;
  currency: string;
  image: string;
  disabled: boolean;
  masterVariantID: number;
}

const SmallProductCard: FC<SmallProductCardParams> = ({
  id,
  productName,
  description,
  price,
  discounted,
  currency,
  image,
  disabled,
  masterVariantID,
}) => {
  const [src, setSrc] = useState(image);
  const [innerDisabled, setInnerDisabled] = useState(disabled);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const handleButtonClick = async (e: React.MouseEvent) => {
    setLoading(true);
    try {
      e.preventDefault();
      setInnerDisabled(true);
      const lineItem: LineItem = {
        productId: id,
        variantId: masterVariantID,
        quantity: 1,
      };
      await cartInteraction(lineItem, dispatch, 'addLineItem');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (innerDisabled && (e.target as HTMLElement).closest('.small-card__button-container')) {
      e.preventDefault();
    }
  };

  return (
    <Link href={`/catalog/product/${id}`} onClick={handleCardClick}>
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
                {`${((discounted ?? price) / 100).toFixed(2)} ${currency}`.replace(
                  CurrencyParams.EUR_TEXT,
                  CurrencyParams.EUR_SYMBOL
                ) || 'Upon request'}
              </div>
              {discounted !== undefined && (
                <div className='small-card__initial-price'>
                  {`${(price / 100).toFixed(2)} ${currency}`.replace(
                    CurrencyParams.EUR_TEXT,
                    CurrencyParams.EUR_SYMBOL
                  )}
                </div>
              )}
            </div>
            <Tooltip title={innerDisabled ? 'This item has been added to the cart' : ''}>
              <span className='small-card__button-container'>
                <LoadingButton
                  disabled={innerDisabled}
                  style={disabled || innerDisabled ? { pointerEvents: 'none' } : {}}
                  className='small-card__button'
                  variant='outlined'
                  onClick={handleButtonClick}
                  loading={loading}>
                  <AddShoppingCartIcon className='small-card__icon' />
                </LoadingButton>
              </span>
            </Tooltip>
          </div>
        </div>
      </Paper>
    </Link>
  );
};

export default SmallProductCard;
