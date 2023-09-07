import React, { FC, useState } from 'react';
import Image from 'next/image';
import { Box, Button, Paper, Tooltip } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import noImage from '@/public/img/jpeg/no-image.jpg';
import Link from 'next/link';
import { getAnonymousAccessTokenAsync } from '@/redux/slices/authSlice/thunks';
import { useDispatch } from '@/redux/store';
import { createCartAsync } from '@/redux/slices/cartSlice/thunk';
import { CartService } from '@/api/services/Cart.services';
import { TokenService } from '@/api/services/Token.service';
import { TokenType } from '@/types/enums';

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
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();

  const handleButtonClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setDisabled(true);
    if (TokenService.getAccessTokenFromLS().type !== TokenType.ANONYMOUS) {
      const anonymousToken = await dispatch(getAnonymousAccessTokenAsync());
      if (!CartService.getCartIdFromLS()) {
        await dispatch(createCartAsync(anonymousToken.payload.access_token));
      }
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (disabled && (e.target as HTMLElement).closest('.small-card__button-container')) {
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
                {`${((discounted ?? price) / 100).toFixed(2)} ${currency}`.replace('EUR', '€') || 'Upon request'}
              </div>
              {discounted !== undefined && (
                <div className='small-card__initial-price'>
                  {`${(price / 100).toFixed(2)} ${currency}`.replace('EUR', '€')}
                </div>
              )}
            </div>
            <Tooltip title={disabled ? 'This item has been added to the cart' : ''}>
              <span className='small-card__button-container'>
                <Button
                  disabled={disabled}
                  style={disabled ? { pointerEvents: 'none' } : {}}
                  className='small-card__button'
                  variant='outlined'
                  onClick={handleButtonClick}>
                  <AddShoppingCartIcon className='small-card__icon' />
                </Button>
              </span>
            </Tooltip>
          </div>
        </div>
      </Paper>
    </Link>
  );
};

export default SmallProductCard;
