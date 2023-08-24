'use client';
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from '@/redux/store';
import { getProductByIdAsync } from '@/redux/slices/productSlice/thunks';
import { TokenService } from '@/api/services/Token.service';

const Product = () => {
  const id: string = usePathname().split('/')[2];
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);

  useEffect(() => {
    const token: string = TokenService.getAccessTokenFromLS()?.token;
    dispatch(getProductByIdAsync({ token, id }));
  }, [dispatch, id]);

  return <div>Product {product.name.en}</div>;
};

export default Product;
