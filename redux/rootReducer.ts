import { authSlice } from '@/redux/slices/authSlice';
import { loginSlice } from '@/redux/slices/loginSlice/loginSlice';
import { productSlice } from '@/redux/slices/productSlice/productSlice';
import { snackbarSlice } from '@/redux/slices/snackbarSlice/snackbarSlice';

export const reducer = {
  auth: authSlice.reducer,
  login: loginSlice.reducer,
  product: productSlice.reducer,
  snackbar: snackbarSlice.reducer,
};
