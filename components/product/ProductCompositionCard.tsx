import React from 'react';
import { Skeleton } from '@mui/material';

interface ProductCompositionCardProps {
  items: string[] | undefined;
}

const ProductCompositionCard: React.FC<ProductCompositionCardProps> = ({ items }) => {
  return (
    <div className='product-composition-card'>
      <h5>Composition</h5>
      {items?.length && <ul>{items?.map((item, index) => <li key={index}>{item}</li>)}</ul>}
      {items !== undefined && !items.length && (
        <ul>
          <li>There is no information about this bouquet</li>
        </ul>
      )}
      {!items && <Skeleton variant='rounded' width={210} height={100} />}
    </div>
  );
};

export default ProductCompositionCard;
