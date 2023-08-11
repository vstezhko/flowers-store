import { getAccessToken } from '@/redux/slices/authSlice/getAccessToken';
import { createAppAsyncThunk } from '@/redux/createAppAsyncThunk';

export const getAccessTokenAsync = createAppAsyncThunk('auth/getAccessToken', async () => {
  return getAccessToken();
});
