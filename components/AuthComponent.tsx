import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '@/redux/store';
import { getClientAccessTokenAsync } from '@/redux/slices/authSlice/thunks';
import { TokenService } from '@/api/services/Token.service';
import { getCustomerAsync } from '@/redux/slices/loginSlice/thunks';
import { TokenType } from '@/types/enums';
import { CartService } from '@/api/services/Cart.services';
import { getCartAsync } from '@/redux/slices/cartSlice/thunk';

const AuthComponent = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { customer } = useSelector(state => state.login);
  const { access_token } = useSelector(state => state.auth);
  const { cartId } = useSelector(state => state.cart);

  useEffect(() => {
    const token = TokenService.getAccessTokenFromLS();
    if (!token) {
      dispatch(getClientAccessTokenAsync());
    }
    if (token?.type === TokenType.CUSTOMER && !customer?.id) {
      dispatch(getCustomerAsync(token.token));
    }
    const cartIdLS = CartService.getCartFromLS()?.id;
    const tokenForCart = access_token ? access_token : token?.token;

    if (cartIdLS && !cartId && tokenForCart) {
      dispatch(getCartAsync({ token: tokenForCart, cartId: cartIdLS }));
    }
  }, [access_token, customer?.id, dispatch]);

  return <>{children}</>;
};
export default AuthComponent;
