import { TokenService } from '@/api/services/Token.service';
import { TokenType } from '@/types/enums';
import { getAnonymousAccessTokenAsync } from '@/redux/slices/authSlice/thunks';
import { CartService, LineItem } from '@/api/services/Cart.services';
import { addToCartAsync, createCartAsync, getCartAsync } from '@/redux/slices/cartSlice/thunk';
import { ThunkDispatch } from 'redux-thunk';
import { SnackbarState } from '@/redux/slices/snackbarSlice/snackbarSlice';
import { CartState } from '@/redux/slices/cartSlice/cartSlice';
import { LoginState } from '@/redux/slices/loginSlice/loginSlice';
import { AuthState } from '@/redux/slices/authSlice';
import { CategoryState } from '@/redux/slices/categorySlice/categorySlice';
import { ProductState } from '@/redux/slices/productSlice/productSlice';
import { SearchProductsState } from '@/redux/slices/searchSlice/searchSlice';
import { AnyAction } from '@reduxjs/toolkit';

export const addToCart = async (
  dispatch: {} & ThunkDispatch<
    {
      snackbar: SnackbarState;
      cart: CartState;
      category: CategoryState;
      login: LoginState;
      auth: AuthState;
      product: ProductState;
      search: SearchProductsState;
    },
    undefined,
    AnyAction
  >,
  id: string
) => {
  let token: string;

  const tokenFromLS = TokenService.getAccessTokenFromLS();
  if (tokenFromLS.type === TokenType.CLIENT) {
    token = (await dispatch(getAnonymousAccessTokenAsync())).payload.access_token;
  } else {
    token = tokenFromLS.token;
  }

  let cartId, cartVersion;
  const cartIdAndVersion = CartService.getCartFromLS();

  cartId = cartIdAndVersion?.id;
  cartVersion = cartIdAndVersion?.version;

  if (!cartId) {
    const createActionResult = await dispatch(createCartAsync(token));
    if (typeof createActionResult.payload === 'object') {
      cartId = createActionResult.payload.cartId;
      cartVersion = createActionResult.payload.version;
    }
  }
  const lineItem: LineItem = {
    productId: id,
    quantity: 1,
  };

  await dispatch(addToCartAsync({ token, cartId, cartVersion, lineItem }));
  await dispatch(getCartAsync({ token, cartId }));
};
