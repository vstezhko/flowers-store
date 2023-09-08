import { CartService, LineItem } from '@/api/services/Cart.services';
import { createAppAsyncThunk } from '@/redux/createAppAsyncThunk';

export const createCartAsync = createAppAsyncThunk('me/cart/create', async (token: string) => {
  return CartService.createCart(token);
});

export const getCartAsync = createAppAsyncThunk(
  'me/cart/get',
  async ({ token, cartId }: { token: string; cartId: string }) => {
    return CartService.getCart(token, cartId);
  }
);

export const addToCartAsync = createAppAsyncThunk(
  'me/cart/addItem',
  async ({
    token,
    cartId,
    cartVersion,
    lineItem,
  }: {
    token: string;
    cartId: string;
    cartVersion: number;
    lineItem: LineItem;
  }) => {
    return CartService.addToCart(token, cartId, cartVersion, lineItem);
  }
);
