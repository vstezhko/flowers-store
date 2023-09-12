import { cartInteractionAsync, createCartAsync, getCartAsync } from '@/redux/slices/cartSlice/thunk';
import { TokenService } from '@/api/services/Token.service';
import { TokenType } from '@/types/enums';
import { getAnonymousAccessTokenAsync } from '@/redux/slices/authSlice/thunks';
import { CartService, LineItem } from '@/api/services/Cart.services';

import { ReduxDispatch } from '@/redux/store';

const createCart = async (token: string, dispatch: ReduxDispatch) => {
  const createActionResult = await dispatch(createCartAsync(token));
  if (createActionResult?.payload?.id && createActionResult?.payload?.version) {
    return {
      cartId: createActionResult.payload.id,
      cartVersion: createActionResult.payload.version,
    };
  }
};

const getTokenForCart = async (dispatch: ReduxDispatch) => {
  const accessToken = TokenService.getAccessTokenFromLS();

  if (accessToken?.type === TokenType.CLIENT) {
    return (await dispatch(getAnonymousAccessTokenAsync())).payload.access_token;
  } else if (accessToken?.token) {
    return accessToken?.token;
  }
};

export const cartInteraction = async (lineItem: LineItem, dispatch: ReduxDispatch, action: string) => {
  const token = await getTokenForCart(dispatch);

  let cartId = CartService.getCartFromLS()?.id;
  let cartVersion = CartService.getCartFromLS()?.version;

  if (!cartId) {
    const resultCart = await createCart(token, dispatch);
    cartId = resultCart?.cartId;
    cartVersion = resultCart?.cartVersion;
  }

  if (cartId && cartVersion) {
    await dispatch(cartInteractionAsync({ token, cartId, cartVersion, lineItem, action }));
    await dispatch(getCartAsync({ token, cartId }));
  }
};
