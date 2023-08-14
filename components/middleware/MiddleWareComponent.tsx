import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '@/redux/store';
import { getClientAccessTokenAsync } from '@/redux/slices/authSlice/thunks';
import { TokenService } from '@/api/services/Token.service';
import { getCustomerAsync } from '@/redux/slices/loginSlice/thunks';
import { TokenType } from '@/types/enums';

const MiddleWareComponent = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector(state => state.login);

  useEffect(() => {
    const token = TokenService.getAccessToken();
    const type_token = TokenService.getAccessTokenFromLS();
    if (!token) {
      // @ts-ignore
      dispatch(getClientAccessTokenAsync());
    }
    if (token && !isLogin && type_token.type === TokenType.CUSTOMER) {
      // @ts-ignore
      dispatch(getCustomerAsync(token));
    }
  });

  return <>{children}</>;
};
export default MiddleWareComponent;
