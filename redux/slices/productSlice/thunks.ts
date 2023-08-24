import { createAppAsyncThunk } from '@/redux/createAppAsyncThunk';
import { ProductService } from '@/api/services/Product.service';

export const getProductByIdAsync = createAppAsyncThunk(
  'product/getProductById',
  async ({ token, id }: { token: string; id: string }) => {
    return ProductService.getProductById(token, id);
  }
);
