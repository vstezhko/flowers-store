import { createSlice, isAnyOf, isFulfilled, PayloadAction } from '@reduxjs/toolkit';
import {
  getAnonymousAccessTokenAsync,
  getClientAccessTokenAsync,
  getCustomerAccessTokenAsync,
} from '@/redux/slices/authSlice/thunks';
import { TokenService } from '@/api/services/Token.service';
import { TokenType } from '@/types/enums';

export interface AuthState {
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
  reducers: {
    setAccessToken: (
      state: AuthState,
      action: {
        payload: Pick<AuthState, 'access_token' | 'expires_in' | 'scope'> & { tokenType: TokenType };
      }
    ) => {
      state.access_token = action.payload.access_token;
      state.expires_in = action.payload.expires_in;
      state.scope = action.payload.scope;
      state.token_type = action.payload.tokenType;
      if (action.payload.access_token)
        TokenService.setAccessTokenToLS(action.payload.access_token, action.payload.tokenType);
    },
  },
  extraReducers: builder => {
    const setAccessToken = (state: AuthState, action: PayloadAction<AuthState>) => {
      state.status = 'idle';
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token || null;
      state.expires_in = action.payload.expires_in;
      state.scope = action.payload.scope;
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
      .addMatcher(isFulfilled(getClientAccessTokenAsync), (state: AuthState, action: PayloadAction<AuthState>) => {
        setAccessToken(state, action);
        if (action.payload.access_token) {
          TokenService.setAccessTokenToLS(action.payload.access_token, TokenType.CLIENT);
          setAccessToken(state, action);
          state.token_type = TokenType.CLIENT;
        }
      })
      .addMatcher(isFulfilled(getAnonymousAccessTokenAsync), (state: AuthState, action: PayloadAction<AuthState>) => {
        setAccessToken(state, action);
        state.token_type = TokenType.ANONYMOUS;
        if (action.payload.access_token)
          TokenService.setAccessTokenToLS(action.payload.access_token, TokenType.ANONYMOUS);
        if (action.payload.refresh_token)
          TokenService.setRefreshTokenToLS(action.payload.refresh_token, TokenType.ANONYMOUS);
      })
      .addMatcher(isFulfilled(getCustomerAccessTokenAsync), (state: AuthState, action: PayloadAction<AuthState>) => {
        setAccessToken(state, action);
        state.token_type = TokenType.CUSTOMER;
        if (action.payload.access_token)
          TokenService.setAccessTokenToLS(action.payload.access_token, TokenType.CUSTOMER);
        if (action.payload.refresh_token)
          TokenService.setRefreshTokenToLS(action.payload.refresh_token, TokenType.CUSTOMER);
      });
  },
});

export const { actions: authActions } = authSlice;
