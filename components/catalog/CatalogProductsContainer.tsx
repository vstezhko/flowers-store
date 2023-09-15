import React, { FC, memo, useEffect, useState } from 'react';
import { useSelector } from '@/redux/store';
import { createProductsForCatalog } from '@/utils/createProductsForCatalog';
import { ResponseSearchProduct } from '@/types/catalog/interface';
import { isProductInCart } from '@/utils/isProductInCart';
import Products from '@/components/catalog/Products';
import DelayedLoader from '@/components/UI/DelayedLoader';

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
      return {
        ...i,
        disabled: !!isProductInCart(i.masterVariantID, cartProductsIds, i.id),
      };
    });
  };

  const [displayProducts, setDisplayProducts] = useState(productsPage ? checkCartPresence(productsPage) : []);

  useEffect(() => {
    if (productsPage) setDisplayProducts(checkCartPresence(productsPage));
  }, [productsPage]);

  return (
    <div className='catalog__container'>
      {isSearchActive && totalResults === 0 ? (
        <h4 className='catalog__message'>
          Unfortunately, no results were found for your search{search ? ` "${search}"` : ''}. Try other options!
        </h4>
      ) : (
        <>
          {isLoadingData ? <DelayedLoader /> : <></>}
          <Products products={displayProducts} />
        </>
      )}
    </div>
  );
};

export default memo(CatalogProductsContainer);
