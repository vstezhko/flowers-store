import React from 'react';
import { Skeleton } from '@mui/material';

interface ProductCompositionCardProps {
  items: string[] | undefined;
}

const ProductCompositionCard: React.FC<ProductCompositionCardProps> = ({ items }) => {
  return (
    <div className='product-composition-card'>
      <h5>Composition</h5>
      {items?.length && (
        <ul className='product-composition-card__list'>{items?.map((item, index) => <li key={index}>{item}</li>)}</ul>
      )}
      {items !== undefined && !items.length && (
        <ul className='product-composition-card__list'>
          <li>
            <p>There is no information about this bouquet</p>
          </li>
        </ul>
      )}
      {!items && (
        <>
          <Skeleton variant='rectangular' width={200} height={30} />
          <Skeleton variant='rectangular' width={200} height={30} />
          <Skeleton variant='rectangular' width={200} height={30} />
          <Skeleton variant='rectangular' width={200} height={30} />
        </>
      )}
    </div>
  );
};

export default ProductCompositionCard;
