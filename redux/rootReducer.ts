import { authSlice } from '@/redux/slices/authSlice';
import { loginSlice } from '@/redux/slices/loginSlice/loginSlice';

export const reducer = {
  auth: authSlice.reducer,
  login: loginSlice.reducer,
};
