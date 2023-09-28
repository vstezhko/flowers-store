import { authSlice } from '@/redux/slices/authSlice';
import { loginSlice } from '@/redux/slices/loginSlice/loginSlice';
import { productSlice } from '@/redux/slices/productSlice/productSlice';
import { snackbarSlice } from '@/redux/slices/snackbarSlice/snackbarSlice';
import { searchSlice } from '@/redux/slices/searchSlice/searchSlice';
import { categorySlice } from '@/redux/slices/categorySlice/categorySlice';
import { cartSlice } from './slices/cartSlice/cartSlice';

export const reducer = {
  auth: authSlice.reducer,
  login: loginSlice.reducer,
  product: productSlice.reducer,
  snackbar: snackbarSlice.reducer,
  search: searchSlice.reducer,
  category: categorySlice.reducer,
  cart: cartSlice.reducer,
};
