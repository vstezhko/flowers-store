import React, { useEffect } from 'react';
import { useDispatch } from '@/redux/store';
import { getClientAccessTokenAsync } from '@/redux/slices/authSlice/thunks';
import { TokenService } from '@/api/services/Token.service';

const MiddleWareComponent = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = TokenService.getAccessToken();
    if (!token) {
      dispatch(getClientAccessTokenAsync());
    }
  });

  return <>{children}</>;
};
export default MiddleWareComponent;
