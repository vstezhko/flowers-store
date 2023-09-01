import { ProductsService } from '@/api/services/Products.services';
import { createAppAsyncThunk } from '@/redux/createAppAsyncThunk';
import { SearchParams, FilterParams } from '@/types/types';

export const getSearchProductsAsync = createAppAsyncThunk(
  'products/search?',
  async ({
    token,
    searchParams,
    filterParams,
  }: {
    token: string;
    searchParams?: SearchParams;
    filterParams?: FilterParams;
  }) => {
    return ProductsService.getSearchProducts(token, searchParams, filterParams);
  }
);
