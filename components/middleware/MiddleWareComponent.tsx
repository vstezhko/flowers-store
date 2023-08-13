import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '@/redux/store';
import { getClientAccessTokenAsync } from '@/redux/slices/authSlice/thunks';
import { TokenService } from '@/api/services/Token.service';
import { getCustomerAsync } from '@/redux/slices/loginSlice/thunks';
import { TokenType } from '@/types/enums';

const MiddleWareComponent = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector(state => state.login);
  // const [token, setToken] = useState<null | string>(null);

  useEffect(() => {
    const token = TokenService.getAccessToken();
    if (!token) {
      dispatch(getClientAccessTokenAsync());
    }
    if (token && !isLogin) {
      const upDateToken = TokenService.getAccessTokenFromLS();
      if (upDateToken?.type === TokenType.CUSTOMER) dispatch(getCustomerAsync(upDateToken.token));
    }
  });

  return <>{children}</>;
};
export default MiddleWareComponent;
