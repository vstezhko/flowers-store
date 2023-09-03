import { ProductsService } from '@/api/services/Products.services';
import { createAppAsyncThunk } from '@/redux/createAppAsyncThunk';

export const getProductsAsync = createAppAsyncThunk('products', async (token: string) => {
  return ProductsService.getProducts(token);
});
