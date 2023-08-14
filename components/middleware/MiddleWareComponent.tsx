import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '@/redux/store';
import { getClientAccessTokenAsync } from '@/redux/slices/authSlice/thunks';
import { TokenService } from '@/api/services/Token.service';
import { getCustomerAsync } from '@/redux/slices/loginSlice/thunks';

const MiddleWareComponent = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector(state => state.login);

  useEffect(() => {
    const token = TokenService.getAccessToken();
    if (!token) dispatch(getClientAccessTokenAsync());
    if (token && !isLogin) dispatch(getCustomerAsync(token));
  });

  return <>{children}</>;
};
export default MiddleWareComponent;
