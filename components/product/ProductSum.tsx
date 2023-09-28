import React, { FC } from 'react';
import { Skeleton } from '@mui/material';
import { CurrencyParams } from '@/types/enums';

export interface ProductSumParams {
  sum: number | undefined;
  coupon?: number | null;
  price?: number | undefined;
}

const ProductSum: FC<ProductSumParams> = ({ sum, coupon, price }) => {
  return (
    <div className='product-block__sum-info'>
      <p className='sum'>SUM</p>
      {sum ? (
        <p className='sum-info__container'>
          {coupon ? (
            <span className='price-before-discount'>
              {price && price.toFixed(2)} {CurrencyParams.EUR_TEXT}
            </span>
          ) : (
            ''
          )}
          {coupon ? coupon.toFixed(2) : sum.toFixed(2)} {CurrencyParams.EUR_TEXT}
        </p>
      ) : (
        <Skeleton variant='rectangular' width={70} height={20} />
      )}
    </div>
  );
};

export default ProductSum;
