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

export const getActiveCartAsync = createAppAsyncThunk('/carts/customer-id', async ({ token }: { token: string }) => {
  return CartService.getActiveCart(token);
});

export const cartInteractionAsync = createAppAsyncThunk(
  'me/cart/interactionWithCart',
  async ({
    token,
    cartId,
    cartVersion,
    lineItem,
    action,
  }: {
    token: string;
    cartId: string;
    cartVersion: number;
    lineItem: LineItem;
    action: string;
  }) => {
    return CartService.cartInteraction(token, cartId, cartVersion, lineItem, action);
  }
);

export const addDiscountCodeAsync = createAppAsyncThunk(
  'me/cart/addDiscount',
  async ({
    token,
    cartId,
    cartVersion,
    action,
    code,
  }: {
    token: string;
    cartId: string;
    cartVersion: number;
    action: string;
    code: string;
  }) => {
    return CartService.addDiscountCode(token, cartId, cartVersion, action, code);
  }
);

export const removeCartAsync = createAppAsyncThunk(
  'me/cart/remove',
  async ({ token, cartId, version }: { token: string; cartId: string; version: number }) => {
    return CartService.removeCart(token, cartId, version);
  }
);
