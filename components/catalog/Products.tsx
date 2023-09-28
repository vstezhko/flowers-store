import React, { FC, memo } from 'react';
import SmallProductCard from '@/components/catalog/SmallCard';
import { PageProduct } from '@/types/catalog/interface';

interface CatalogProduct extends PageProduct {
  disabled: boolean;
}

export interface ProductsParams {
  products: CatalogProduct[];
}

const Products: FC<ProductsParams> = ({ products }) => {
  return (
    <>
      {products.map(product => {
        return (
          <SmallProductCard
            key={product.id}
            id={product.id}
            masterVariantID={product.masterVariantID}
            productName={product.name || 'No product name'}
            price={product.price}
            discounted={product.discounted}
            currency={product.currency}
            description={product.description || 'No description available'}
            image={product.image}
            disabled={product.disabled}
          />
        );
      })}
    </>
  );
};

export default memo(Products);
