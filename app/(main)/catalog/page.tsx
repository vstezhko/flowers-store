'use client';
import { useCallback, useEffect, useState } from 'react';
import { TokenService } from '@/api/services/Token.service';
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
import CatalogProductsContainer from '@/components/catalog/CatalogProductsContainer';

export interface ProductCategory {
  typeId: string;
  id: string;
}

interface ProductPrice {
  id: string;
  discounted: {
    discount: {
      typeId: string;
      id: string;
    };
    value: {
      type: string;
      currencyCode: CurrencyParams.EUR_TEXT;
      centAmount: number;
      fractionDigits: number;
    };
  };
  value: {
    type: string;
    currencyCode: CurrencyParams.EUR_TEXT;
    centAmount: number;
    fractionDigits: number;
  };
}

interface ProductImage {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
}

interface Channel {
  isOnStock: boolean;
  availableQuantity: number;
  version: number;
  id: string;
}

interface ProductVariant {
  id: number;
  sku: string;
  key: string;
  prices: ProductPrice[];
  images: ProductImage[];
  attributes: ProductAttribute[];
  assets: [];
  availability: {
    channels: Record<string, Channel>;
  };
}

interface ProductAttribute {
  name: string;
  value: string;
}

export interface ResponseSearchProduct {
  id: string;
  name: {
    en: string | null;
  };
  description: {
    en: string | null;
  };
  masterVariant: ProductVariant;
  variants: ProductVariant[];
}

export interface PageProduct {
  id: string;
  name: string;
  price: number;
  discounted: number | undefined;
  currency: string;
  image: string;
  description: string;
}

const Catalog = () => {
  const dispatch = useDispatch();
  const { search, checkboxState, priceRange, categoryId, sortIndex, paginatorPage } = useSelector(
    state => state.search
  );
  const { access_token, token_type } = useSelector(state => state.auth);
  const [totalResults, setTotalResults] = useState(0);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [catalogData, setCatalogData] = useState<{ total: number; results: ResponseSearchProduct[] } | null>(null);
  const [isToken, setIsToken] = useState(access_token !== null);

  useEffect(() => {
    setIsToken(function (prev: boolean) {
      return !prev && token_type !== null ? true : prev;
    });
  }, [token_type]);

  useEffect(() => {
    const cartId = CartService.getCartFromLS()?.id;

    const tokenLS = TokenService.getAccessTokenFromLS();
    const tokenForCart = access_token ? access_token : tokenLS?.token;

    if (cartId && tokenForCart) {
      dispatch(getCartAsync({ token: tokenForCart, cartId }));
    }
  }, [dispatch, isToken]);

  const fetchSearchProducts = useCallback(
    async (accessToken: string, searchParams?: SearchParams, filterParams?: FilterParams, priceParams?: number[]) => {
      setIsLoadingData(true);
      setIsSearchActive(true);
      if (!accessToken) return;

      const response = await dispatch(
        getSearchProductsAsync({
          token: accessToken,
          paginatorPage,
          searchParams,
          filterParams,
          priceParams,
          categoryId,
          sortIndex,
        })
      ).unwrap();
      setTotalResults(response.total);
      setCatalogData(response);
      setIsLoadingData(false);
    },
    [dispatch, categoryId, sortIndex, isToken]
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

    const tokenLS = TokenService.getAccessTokenFromLS();
    const tokenForSearch = access_token ? access_token : tokenLS?.token;

    if (tokenForSearch) {
      fetchSearchProducts(
        tokenForSearch,
        { 'text.en': search, fuzzy: true, priceCurrency: CurrencyParams.EUR_TEXT },
        filterOptions,
        priceRange
      );
    }
  }, [search, checkboxState, priceRange, dispatch, fetchSearchProducts]);

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
              value={search}
              onChange={value => dispatch(searchActions.setSearch(value))}
              inputProps={{}}
            />
            <SortMenu />
          </Paper>
          <CatalogProductsContainer
            isLoadingData={isLoadingData}
            isSearchActive={isSearchActive}
            productsPage={catalogData}
            search={search}
            totalResults={totalResults}
          />
          <Paginator count={Math.ceil(totalResults / PaginationParams.LIMIT)} />
        </div>
      </div>
    </section>
  );
};

export default Catalog;
