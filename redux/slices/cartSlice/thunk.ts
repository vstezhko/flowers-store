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

export const cartInteractionAsync = createAppAsyncThunk(
  'me/cart/addItem',
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

// export const removeFromCartAsync = createAppAsyncThunk(
//   'me/cart/removeItem',
//   async ({
//     token,
//     cartId,
//     cartVersion,
//     lineItem,
//   }: {
//     token: string;
//     cartId: string;
//     cartVersion: number;
//     lineItem: LineItem;
//   }) => {
//     return CartService.removeFromCart(token, cartId, cartVersion, lineItem);
//   }
// );
