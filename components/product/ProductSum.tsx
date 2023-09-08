import React, { FC } from 'react';
import { Skeleton } from '@mui/material';
import { CurrencyParams } from '@/types/enums';

export interface ProductSumParams {
  sum: number | undefined;
}

const ProductSum: FC<ProductSumParams> = ({ sum }) => {
  return (
    <div className='product-block__sum-info'>
      <p>Sum</p>
      {sum ? (
        <p>
          {sum.toFixed(2)} {CurrencyParams.EUR_TEXT}
        </p>
      ) : (
        <Skeleton variant='rectangular' width={70} height={20} />
      )}
    </div>
  );
};

export default ProductSum;
