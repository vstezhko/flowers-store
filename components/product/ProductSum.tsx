import React, { FC } from 'react';
import { Skeleton } from '@mui/material';

export interface ProductSumParams {
  sum: number | undefined;
}

const ProductSum: FC<ProductSumParams> = ({ sum }) => {
  return (
    <div className='product-block__sum-info'>
      <p>Sum</p>
      {sum ? <p>{sum} EUR</p> : <Skeleton variant='rectangular' width={70} height={20} />}
    </div>
  );
};

export default ProductSum;
