import React, { FC, useEffect, useState } from 'react';
import SmallProductCard from '@/components/catalog/SmallCard';
import { ResponseSearchProduct } from '@/app/(main)/catalog/page';
import { useSelector } from '@/redux/store';
import { createProductsForCatalog } from '@/utils/createProductsForCatalog';

export interface CatalogProductsContainerParams {
  isLoadingData: boolean;
  isSearchActive: boolean;
  totalResults: number;
  search: string;
  productsPage: { total: number; results: ResponseSearchProduct[] } | null;
}

const CatalogProductsContainer: FC<CatalogProductsContainerParams> = ({
  isLoadingData,
  isSearchActive,
  totalResults,
  search,
  productsPage,
}) => {
  const cartProductsIds = useSelector(state => state.cart.cartProductsIds);

  const checkCartPresence = (initialProducts: { total: number; results: ResponseSearchProduct[] }) => {
    const products = createProductsForCatalog(initialProducts.results);
    return products.map(i => {
      return { ...i, disabled: cartProductsIds.includes(i.id) };
    });
  };

  const [displayProducts, setDisplayProducts] = useState(productsPage ? checkCartPresence(productsPage) : []);

  useEffect(() => {
    if (productsPage) setDisplayProducts(checkCartPresence(productsPage));
  }, [cartProductsIds, productsPage]);

  return (
    <div className='catalog__container'>
      {isLoadingData ? (
        <h4 className='catalog__message'>Loading ...</h4>
      ) : isSearchActive && totalResults === 0 ? (
        <h4 className='catalog__message'>
          Unfortunately, no results were found for your search{search ? ` "${search}"` : ''}. Try other options!
        </h4>
      ) : (
        displayProducts.map(product => {
          return (
            <SmallProductCard
              key={product.id}
              id={product.id}
              productName={product.name || 'No product name'}
              price={product.price}
              discounted={product.discounted}
              currency={product.currency}
              description={product.description || 'No description available'}
              image={product.image}
              disabled={product.disabled}
            />
          );
        })
      )}
    </div>
  );
};

export default CatalogProductsContainer;