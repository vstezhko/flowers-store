import React, { useEffect } from 'react';
import { useDispatch } from '@/redux/store';
import { getAccessTokenAsync } from '@/redux/slices/authSlice/thunks';

const MiddleWareComponent = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAccessTokenAsync());
  });
  return <>{children}</>;
};

export default MiddleWareComponent;
