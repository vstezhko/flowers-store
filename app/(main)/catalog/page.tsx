'use client';
import SmallProductCard from '@/components/catalog/SmallCard';
import { useCallback, useEffect, useState } from 'react';
import { TokenService } from '@/api/services/Token.service';
import noImage from '@/public/img/jpeg/no-image.jpg';
import { Paper } from '@mui/material';
import Searchbar from '@/components/catalog/SearchBar';
import { SearchParams, FilterParams } from '@/types/types';
import { actions as searchActions } from '@/redux/slices/searchSlice/searchSlice';
import { useDispatch, useSelector } from '@/redux/store';
import CategorySelector from '@/components/catalog/CategorySelector';
import { getSearchProductsAsync } from '@/redux/slices/searchSlice/thunks';
import FilterBlock from '@/components/catalog/Filter';
import SortMenu from '@/components/catalog/SortMenu';
import CategoryBreadcrumbs from '@/components/catalog/CategoryBreadcrumbs';
import Paginator from '@/components/catalog/Paginator';
import { CurrencyParams, PaginationParams } from '@/types/enums';
import { getCartAsync } from '@/redux/slices/cartSlice/thunk';
import { CartService } from '@/api/services/Cart.services';
import { PageProduct, ResponseSearchProduct } from '@/types/interface';

const Catalog = () => {
  const dispatch = useDispatch();
  const searchItem = useSelector(state => state.search.search);
  const checkboxState = useSelector(state => state.search.checkboxState);
  const priceRange = useSelector(state => state.search.priceRange);
  const categoryId = useSelector(state => state.search.categoryId);
  const sortIndex = useSelector(state => state.search.sortIndex);
  const paginatorPage = useSelector(state => state.search.paginatorPage);
  const cartProductsIds = useSelector(state => state.cart?.cartProductsIds);
  const [productsPage, setProductsPage] = useState<PageProduct[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    const cartId = CartService.getCartFromLS()?.id;
    if (cartId) {
      dispatch(getCartAsync({ token: TokenService.getAccessTokenFromLS().token, cartId }));
    }
  }, [dispatch]);

  const fetchSearchProducts = useCallback(
    async (searchParams?: SearchParams, filterParams?: FilterParams, priceParams?: number[]) => {
      setIsLoadingData(true);
      setIsSearchActive(true);

      try {
        const response = await dispatch(
          getSearchProductsAsync({
            token: TokenService.getAccessTokenFromLS().token,
            paginatorPage,
            searchParams,
            filterParams,
            priceParams,
            categoryId,
            sortIndex,
          })
        ).unwrap();
        setTotalResults(response.total);
        const products = response.results.map((item: ResponseSearchProduct) => {
          return {
            id: item.id,
            name: item.name.en,
            price: item.masterVariant.prices[0].value.centAmount,
            discounted: item.masterVariant.prices[0].discounted?.value.centAmount,
            currency:
              item.masterVariant.prices[0].discounted?.value.currencyCode ??
              item.masterVariant.prices[0].value.currencyCode,
            image: item.masterVariant.images[0]?.url ? item.masterVariant.images[0].url : noImage.src,
            description: item.description.en,
          };
        });
        setProductsPage(products);
      } finally {
        setIsLoadingData(false);
      }
    },
    [dispatch, paginatorPage, categoryId, sortIndex]
  );

  useEffect(() => {
    let filterOptions: FilterParams = {};

    for (const filterIdState in checkboxState) {
      const options = checkboxState[filterIdState];
      for (const optionKeyState in options) {
        if (options[optionKeyState]) {
          if (filterOptions[filterIdState]) {
            filterOptions[filterIdState].push(optionKeyState);
          } else {
            filterOptions[filterIdState] = [optionKeyState];
          }
        }
      }
    }

    fetchSearchProducts(
      { 'text.en': searchItem, fuzzy: true, priceCurrency: CurrencyParams.EUR_TEXT },
      filterOptions,
      priceRange
    );
  }, [searchItem, checkboxState, priceRange, dispatch, fetchSearchProducts]);

  return (
    <section className='catalog page'>
      <CategoryBreadcrumbs categoryId={categoryId} />
      <div className='catalog-page-wrapper'>
        <Paper className='settings' elevation={0}>
          <CategorySelector />
          <FilterBlock />
        </Paper>
        <div className='catalog-wrapper'>
          <Paper className='searchbar-block' elevation={0}>
            <Searchbar
              onSubmit={(newSearchItem: string) => {
                dispatch(searchActions.setSearch(newSearchItem));
              }}
              onClear={() => dispatch(searchActions.setSearch(''))}
              value={searchItem}
              onChange={value => dispatch(searchActions.setSearch(value))}
              inputProps={{}}
            />
            <SortMenu />
          </Paper>
          <div className='catalog__container'>
            {isLoadingData ? (
              <h4 className='catalog__message'>Loading ...</h4>
            ) : isSearchActive && totalResults === 0 ? (
              <h4 className='catalog__message'>
                Unfortunately, no results were found for your search{searchItem ? ` "${searchItem}"` : ''}. Try other
                options!
              </h4>
            ) : (
              productsPage.map(product => (
                <SmallProductCard
                  key={product.id}
                  id={product.id}
                  productName={product.name || 'No product name'}
                  price={product.price}
                  discounted={product.discounted}
                  currency={product.currency}
                  description={product.description || 'No description available'}
                  image={product.image}
                  disabled={cartProductsIds.includes(product.id) ? true : false}
                />
              ))
            )}
          </div>
          <Paginator count={Math.ceil(totalResults / PaginationParams.LIMIT)} />
        </div>
      </div>
    </section>
  );
};

export default Catalog;
