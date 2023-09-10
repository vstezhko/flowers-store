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
    if (!token) dispatch(getClientAccessTokenAsync());
  });

  useEffect(() => {
    const token = TokenService.getAccessTokenFromLS();
    if (token?.type === TokenType.CUSTOMER && !customer?.id) dispatch(getCustomerAsync(token.token));
  }, [access_token, customer?.id, dispatch]);

  useEffect(() => {
    const cartId = CartService.getCartFromLS()?.id;
    if (cartId) {
      dispatch(getCartAsync({ token: TokenService.getAccessTokenFromLS().token, cartId }));
    }
  }, [dispatch]);

  return <>{children}</>;
};
export default AuthComponent;
