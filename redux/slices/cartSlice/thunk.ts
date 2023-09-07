import { CartService } from '@/api/services/Cart.services';
import { createAppAsyncThunk } from '@/redux/createAppAsyncThunk';

export const createCartAsync = createAppAsyncThunk('me/cart?', async (token: string) => {
  return CartService.createCart(token);
});
