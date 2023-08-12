import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '@/redux/store';
import {
  // getAnonymousAccessTokenAsync,
  // getClientAccessTokenAsync,
  getCustomerAccessTokenAsync,
} from '@/redux/slices/authSlice/thunks';
import { apiInstanceToken } from '@/api/api';
import { selectCustomerToken } from '@/redux/slices/authSlice/selectors';

const MiddleWareComponent = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  // const clientToken = useSelector(selectClientToken);
  // const anonymousToken = useSelector(selectAnonymousToken);
  const customerToken = useSelector(selectCustomerToken);

  const get = (url: string, token: string) => {
    return apiInstanceToken(token)
      .get(url, {})
      .then(res => res.data);
  };
  const getProducts = (token: string) => {
    return get('/flowers-store/products', token);
  };

  useEffect(() => {
    // dispatch(getClientAccessTokenAsync());
    // if (anonymousToken === null) dispatch(getAnonymousAccessTokenAsync());
    if (customerToken === null) dispatch(getCustomerAccessTokenAsync());
  });

  // useEffect(() => {
  //   if (clientToken !== null) console.log('clientToken PRODUCTS', getProducts(clientToken));
  // }, [clientToken]);
  //
  // useEffect(() => {
  //   if (anonymousToken !== null) console.log('anonToken PRODUCTS', getProducts(anonymousToken));
  // }, [anonymousToken]);

  useEffect(() => {
    if (customerToken !== null) console.log('customerToken PRODUCTS', getProducts(customerToken));
  }, [customerToken]);

  return <>{children}</>;
};

export default MiddleWareComponent;
