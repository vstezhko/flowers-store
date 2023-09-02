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
import { getProductsAsync } from '@/redux/slices/catalogSlice/thunks';
import FilterBlock from '@/components/catalog/Filter';

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
      currencyCode: 'EUR';
      centAmount: number;
      fractionDigits: number;
    };
  };
  value: {
    type: string;
    currencyCode: 'EUR';
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

interface ProductMasterData {
  current: CurrentProductData;
}

interface CurrentProductData {
  name: {
    en: string | null;
  };
  description: {
    en: string | null;
  };
  categories: ProductCategory[];
  categoryOrderHints: {};
  images: ProductImage[];
  slug: {
    en: string | null;
  };
  metaTitle: {
    en: string | null;
  };
  metaKeywords: {
    en: string | null;
  };
  metaDescription: {
    en: string | null;
  };
  masterVariant: ProductVariant;
  variants: ProductVariant[];
  searchKeywords: {};
}

interface ResponseSearchProduct {
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

interface ResponseProduct {
  id: string;
  masterData: ProductMasterData;
}

interface PageProduct {
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
  const searchItem = useSelector(state => state.search.search);
  const checkboxState = useSelector(state => state.search.checkboxState);
  const priceRange = useSelector(state => state.search.priceRange);
  const [productsPage, setProductsPage] = useState<PageProduct[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isSearchActive, setIsSearchActive] = useState(false);

  function getLowestPrice(masterVariant: ProductVariant, variants: ProductVariant[] = []) {
    const allVariants = [masterVariant, ...variants];
    const lowestPriceVariant = allVariants.sort((a, b) => {
      const priceA = a.prices[0].discounted?.value.centAmount ?? a.prices[0].value.centAmount;
      const priceB = b.prices[0].discounted?.value.centAmount ?? b.prices[0].value.centAmount;
      return priceA - priceB;
    })[0];
    const { discounted, value } = lowestPriceVariant.prices[0];
    return {
      price: value.centAmount,
      discounted: discounted?.value.centAmount,
      currencyCode: discounted?.value.currencyCode ?? value.currencyCode,
    };
  }

  const fetchProducts = useCallback(async () => {
    setIsSearchActive(false);
    const response = await dispatch(getProductsAsync(TokenService.getAccessTokenFromLS().token)).unwrap();
    const products = response.results.map((item: ResponseProduct) => {
      const { masterVariant, variants } = item.masterData.current;
      const prices = getLowestPrice(masterVariant, variants);
      return {
        id: item.id,
        name: item.masterData.current.name.en,
        price: prices.price,
        discounted: prices.discounted,
        currency: prices.currencyCode,
        image: item.masterData.current.masterVariant.images[0].url
          ? item.masterData.current.masterVariant.images[0].url
          : noImage.src,
        description: item.masterData.current.description.en,
      };
    });
    setProductsPage(products);
  }, [dispatch]);

  const fetchSearchProducts = useCallback(
    async (searchParams?: SearchParams, filterParams?: FilterParams, priceParams?: number[]) => {
      setIsSearchActive(true);
      const response = await dispatch(
        getSearchProductsAsync({
          token: TokenService.getAccessTokenFromLS().token,
          searchParams,
          filterParams,
          priceParams,
        })
      ).unwrap();
      setTotalResults(response.total);
      const products = response.results.map((item: ResponseSearchProduct) => {
        const { masterVariant, variants } = item;
        const prices = getLowestPrice(masterVariant, variants);
        return {
          id: item.id,
          name: item.name.en,
          price: prices.price,
          discounted: prices.discounted,
          currency: prices.currencyCode,
          image: item.masterVariant.images[0]?.url ? item.masterVariant.images[0].url : noImage.src,
          description: item.description.en,
        };
      });
      setProductsPage(products);
    },
    [dispatch]
  );

  useEffect(() => {
    let filterExist = false;
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
          filterExist = true;
        }
      }
    }

    if (searchItem || filterExist || priceRange) {
      fetchSearchProducts({ 'text.en': searchItem, fuzzy: true, priceCurrency: 'EUR' }, filterOptions, priceRange);
    } else {
      fetchProducts();
    }
  }, [searchItem, checkboxState, priceRange, dispatch, fetchSearchProducts, fetchProducts]);

  return (
    <section className='catalog page'>
      <h1 className='page__title'>Catalog</h1>
      <div className='catalog-page-wrapper'>
        <Paper className='settings' elevation={0}>
          <Searchbar
            className='settings__search'
            onSubmit={(newSearchItem: string) => {
              dispatch(searchActions.setSearch(newSearchItem));
            }}
            value={searchItem}
            onChange={value => dispatch(searchActions.setSearch(value))}
            inputProps={{}}
          />
          <CategorySelector />
          <FilterBlock />
        </Paper>
        {isSearchActive && totalResults === 0 ? (
          <h4 className='catalog__message'>
            Unfortunately, no results were found for your search{searchItem ? ` "${searchItem}"` : ''}. Try other
            options!
          </h4>
        ) : (
          <div className='catalog__container'>
            {productsPage.map(product => (
              <SmallProductCard
                key={product.id}
                id={product.id}
                productName={product.name || 'No product name'}
                price={product.price}
                discounted={product.discounted}
                currency={product.currency}
                description={product.description || 'No description available'}
                image={product.image}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Catalog;
