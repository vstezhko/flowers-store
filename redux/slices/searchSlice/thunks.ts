import { ProductsService } from '@/api/services/Products.services';
import { createAppAsyncThunk } from '@/redux/createAppAsyncThunk';
import { QueryParams } from '@/types/types';

export const getSearchProductsAsync = createAppAsyncThunk(
  'products/search?',
  async ({ token, queryParams }: { token: string; queryParams: QueryParams }) => {
    return ProductsService.getSearchProducts(token, queryParams);
  }
);
