import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import {
  getAnonymousAccessTokenAsync,
  getClientAccessTokenAsync,
  getCustomerAccessTokenAsync,
} from '@/redux/slices/authSlice/thunks';
import { TokenService } from '@/api/services/Token.service';

interface AuthState {
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  access_token: string | null;
  refresh_token?: string | null;
  expires_in: number | null;
  scope: string | null;
  token_type: string | null;
}

const initialState: AuthState = {
  status: 'idle',
  access_token: null,
  refresh_token: null,
  expires_in: null,
  scope: null,
  token_type: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    const setAccessToken = (state: AuthState, action: PayloadAction<AuthState>) => {
      state.status = 'idle';
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token || null;
      state.expires_in = action.payload.expires_in;
      state.scope = action.payload.scope;
      state.token_type = action.payload.token_type;

      if (action.payload.access_token) TokenService.setAccessTokenToLS(action.payload.access_token);
    };

    builder
      .addMatcher(
        isAnyOf(
          getClientAccessTokenAsync.pending,
          getAnonymousAccessTokenAsync.pending,
          getCustomerAccessTokenAsync.pending
        ),
        state => {
          state.status = 'pending';
        }
      )
      .addMatcher(
        isAnyOf(
          getClientAccessTokenAsync.fulfilled,
          getAnonymousAccessTokenAsync.fulfilled,
          getCustomerAccessTokenAsync.fulfilled
        ),
        setAccessToken
      );
  },
});

export const { actions: authActions } = authSlice;
