import React, { FC } from 'react';
import ProductVariantCard from '@/components/product/ProductVariantCard';
import { Skeleton } from '@mui/material';
import { ProductVariant } from '@/redux/slices/productSlice/productSlice';

export interface ProductVariantsParams {
  productVariants: { size: string; variant: ProductVariant }[];
  activeVariant: { size: string; variant: ProductVariant } | null;
  onChange: (id: number) => void;
}

const ProductVariants: FC<ProductVariantsParams> = ({ productVariants, activeVariant, onChange }) => {
  return (
    <div className='product-block__variants'>
      {productVariants.length ? (
        productVariants.map(variant => {
          return (
            <ProductVariantCard
              key={variant?.variant.id}
              id={variant?.size.toString()}
              price={variant?.variant.prices[0].value.centAmount / 100}
              discounted={
                variant?.variant.prices[0].discounted
                  ? variant?.variant.prices[0].discounted.value.centAmount / 100
                  : null
              }
              isActive={variant?.variant.id === activeVariant?.variant.id}
              onClick={() => onChange(variant?.variant.id)}
            />
          );
        })
      ) : (
        <>
          <Skeleton style={{ margin: '10px 0' }} variant='rounded' width={155} height={63} />
          <Skeleton style={{ margin: '10px 0' }} variant='rounded' width={155} height={63} />
          <Skeleton style={{ margin: '10px 0' }} variant='rounded' width={155} height={63} />
        </>
      )}
    </div>
  );
};

export default ProductVariants;
