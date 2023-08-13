import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '@/redux/store';
import { getClientAccessTokenAsync } from '@/redux/slices/authSlice/thunks';
import { TokenService } from '@/api/services/Token.service';
import { getCustomerAsync } from '@/redux/slices/loginSlice/thunks';

const MiddleWareComponent = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector(state => state.login);
  // const [token, setToken] = useState<null | string>(null);

  useEffect(() => {
    const token = TokenService.getAccessToken();
    if (token === null) {
      dispatch(getClientAccessTokenAsync());
    }
    if (token !== null && !isLogin) {
      const upDateToken = TokenService.getAccessTokenFromLS();
      if (upDateToken) dispatch(getCustomerAsync(upDateToken));
    }
  });

  return <>{children}</>;
};
export default MiddleWareComponent;
