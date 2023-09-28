import { ProductsService } from '@/api/services/Products.services';
import { createAppAsyncThunk } from '@/redux/createAppAsyncThunk';
import { SearchParams, FilterParams } from '@/types/types';

export const getSearchProductsAsync = createAppAsyncThunk(
  'products/search?',
  async ({
    token,
    paginatorPage,
    searchParams,
    filterParams,
    priceParams,
    categoryId,
    sortIndex,
  }: {
    token: string;
    paginatorPage: number;
    searchParams?: SearchParams;
    filterParams?: FilterParams;
    priceParams?: number[];
    categoryId?: string;
    sortIndex?: number;
  }) => {
    return ProductsService.getSearchProducts(
      token,
      paginatorPage,
      searchParams,
      filterParams,
      priceParams,
      categoryId,
      sortIndex
    );
  }
);
