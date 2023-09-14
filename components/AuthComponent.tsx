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

  useEffect(() => {
    const token = TokenService.getAccessTokenFromLS();
    if (!token) {
      dispatch(getClientAccessTokenAsync());
      console.log('getClientAccessTokenAsync');
    }
    if (token?.type === TokenType.CUSTOMER && !customer?.id) {
      dispatch(getCustomerAsync(token.token));
      console.log('getCustomerAsync');
    }
    const cartId = CartService.getCartFromLS()?.id;
    const tokenForCart = access_token ? access_token : token?.token;

    if (cartId && tokenForCart) {
      dispatch(getCartAsync({ token: tokenForCart, cartId }));
      console.log('getCartAsync');
    }
  }, [access_token, customer?.id, dispatch]);

  return <>{children}</>;
};
export default AuthComponent;
