import { authSlice } from '@/redux/slices/authSlice';
import { loginSlice } from '@/redux/slices/loginSlice/loginSlice';
import { productSlice } from '@/redux/slices/productSlice/productSlice';

export const reducer = {
  auth: authSlice.reducer,
  login: loginSlice.reducer,
  product: productSlice.reducer,
};
