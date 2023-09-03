import React, { FC } from 'react';
import { Skeleton } from '@mui/material';

interface ProductVariantCardParams {
  id: string;
  price: number;
  discounted?: number | null;
  isActive?: boolean;
  onClick?: () => void;
}

const variantsDefinition: Record<string, string> = {
  '1': 'small',
  '2': 'medium',
  '3': 'big',
  '0': '',
};

const ProductVariantCard: FC<ProductVariantCardParams> = ({ id, price, discounted, isActive = false, onClick }) => {
  return (
    <div className={`product-variant-card ${isActive ? 'product-variant-card_active' : ''}`} onClick={onClick}>
      {id ? <p>{variantsDefinition[id]}</p> : <Skeleton variant='rectangular' width={70} height={20} />}

      {price ? (
        <p>
          {discounted ? <span className='price-before-discount'>{price.toFixed(2)}</span> : ''}{' '}
          {discounted ? <span>{discounted.toFixed(2)}</span> : <span>{price.toFixed(2)}</span>} EUR
        </p>
      ) : (
        <Skeleton variant='rectangular' width={120} height={20} />
      )}

      <div className={`product-variant-card__point product-variant-card__point_${isActive ? 'active' : 'notactive'}`}>
        <div className='center'></div>
      </div>
    </div>
  );
};

export default ProductVariantCard;
