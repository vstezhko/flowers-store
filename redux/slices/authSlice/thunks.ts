import { getClientAccessToken } from '@/redux/slices/authSlice/getClientAccessToken';
import { createAppAsyncThunk } from '@/redux/createAppAsyncThunk';
import { getAnonymousAccessToken } from '@/redux/slices/authSlice/getAnonymousAccessToken';
import { getCustomerAccessToken } from '@/redux/slices/authSlice/getCustomerAccessToken';

export const getClientAccessTokenAsync = createAppAsyncThunk('auth/getClientAccessToken', async () => {
  return getClientAccessToken();
});

export const getAnonymousAccessTokenAsync = createAppAsyncThunk('auth/getAnonymousAccessToken', async () => {
  return getAnonymousAccessToken();
});

export const getCustomerAccessTokenAsync = createAppAsyncThunk('auth/getCustomerAccessToken', async () => {
  return getCustomerAccessToken();
});
