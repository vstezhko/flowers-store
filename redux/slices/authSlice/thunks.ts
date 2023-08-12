import { createAppAsyncThunk } from '@/redux/createAppAsyncThunk';
import { AuthService } from '@/api/services/Auth.services';

export const getClientAccessTokenAsync = createAppAsyncThunk('auth/getClientAccessToken', async () => {
  return AuthService.getClientAccessToken();
});

export const getAnonymousAccessTokenAsync = createAppAsyncThunk('auth/getAnonymousAccessToken', async () => {
  return AuthService.getAnonymousAccessToken();
});

export const getCustomerAccessTokenAsync = createAppAsyncThunk('auth/getCustomerAccessToken', async () => {
  return AuthService.getCustomerAccessToken();
});
