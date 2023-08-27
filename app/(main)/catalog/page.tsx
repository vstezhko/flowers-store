'use client';
import { ProductService } from '@/api/services/Products.services';
import SmallProductCard from '@/components/catalog/SmallCard';
import { useCallback, useEffect, useState } from 'react';
import { TokenService } from '@/api/services/Token.service';
import noImage from '@/public/img/jpeg/no-image.jpg';
import { Paper } from '@mui/material';
import Searchbar from '@/components/catalog/SearchBar';
import { QueryParams } from '@/types/types';
import { actions as searchActions } from '@/redux/slices/searchSlice/searchSlice';
import { actions as snackbarActions } from '@/redux/slices/snackbarSlice/snackbarSlice';
import { useDispatch, useSelector } from '@/redux/store';

export interface ProductCategory {
  typeId: string;
  id: string;
}

interface ProductPrice {
  id: string;
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
}

interface ResponseProduct {
  id: string;
  masterData: ProductMasterData;
}

interface PageProduct {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  description: string;
}

const Catalog = () => {
  const dispatch = useDispatch();
  const searchItem = useSelector(state => state.search);
  const [productsPage, setProductsPage] = useState<PageProduct[]>([]);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await ProductService.getProducts(TokenService.getAccessTokenFromLS().token);
      const products = response.results.map((item: ResponseProduct) => {
        return {
          id: item.id,
          name: item.masterData.current.name.en,
          price: item.masterData.current.masterVariant.prices[0].value.centAmount,
          currency: item.masterData.current.masterVariant.prices[0].value.currencyCode,
          image: item.masterData.current.masterVariant.images[0].url
            ? item.masterData.current.masterVariant.images[0].url
            : noImage.src,
          description: item.masterData.current.description.en,
        };
      });
      setProductsPage(products);
    } catch (error) {
      debugger;
      dispatch(
        snackbarActions.setMessage({
          message: 'An error occurred while fetching products. Try again later!',
          variant: 'error',
        })
      );
    }
  }, [dispatch]);

  const fetchSearchProducts = useCallback(
    async (queryParams: QueryParams) => {
      try {
        const response = await ProductService.getSearchProducts(TokenService.getAccessTokenFromLS().token, queryParams);
        const products = response.results.map((item: ResponseSearchProduct) => {
          return {
            id: item.id,
            name: item.name.en,
            price: item.masterVariant.prices[0].value.centAmount,
            currency: item.masterVariant.prices[0].value.currencyCode,
            image: item.masterVariant.images[0].url ? item.masterVariant.images[0].url : noImage.src,
            description: item.description.en,
          };
        });
        setProductsPage(products);
      } catch (error) {
        dispatch(
          snackbarActions.setMessage({
            message: 'An error occurred while searching products. Try again later!',
            variant: 'error',
          })
        );
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (searchItem) {
      fetchSearchProducts({ 'text.en': `${searchItem}`, fuzzy: true });
    } else {
      fetchProducts();
    }
  }, [searchItem, dispatch, fetchSearchProducts, fetchProducts]);

  return (
    <section className='catalog page'>
      <h1 className='page__title'>Catalog</h1>
      <div className='catalog-page-wrapper'>
        <Paper className='settings' elevation={0}>
          <Searchbar
            className='settings__search'
            onSubmit={(newSearchItem: string) => {
              dispatch(searchActions.setSearch(newSearchItem));
              fetchSearchProducts({ 'text.en': `${newSearchItem}`, fuzzy: true });
            }}
            value={searchItem}
            onChange={value => dispatch(searchActions.setSearch(value))}
            inputProps={{}}
          />
        </Paper>

        <div className='catalog__container'>
          {productsPage.map(product => (
            <SmallProductCard
              key={product.id}
              id={product.id}
              productName={product.name || 'No product name'}
              price={product.price ? `From ${product.price / 100} ${product.currency}` : 'Upon request'}
              description={product.description || 'No description available'}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalog;
