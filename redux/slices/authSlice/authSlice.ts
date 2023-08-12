import { createSlice } from '@reduxjs/toolkit';
import {
  getAnonymousAccessTokenAsync,
  getClientAccessTokenAsync,
  getCustomerAccessTokenAsync,
} from '@/redux/slices/authSlice/thunks';

interface AuthState {
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  access_token: string | null;
  expires_in: number | null;
  scope: string | null;
  token_type: string | null;
}

const initialState: Record<string, AuthState> = {
  clientAuth: {
    status: 'idle',
    access_token: null,
    expires_in: null,
    scope: null,
    token_type: null,
  },
  anonymousAuth: {
    status: 'idle',
    access_token: null,
    expires_in: null,
    scope: null,
    token_type: null,
  },
  customerAuth: {
    status: 'idle',
    access_token: null,
    expires_in: null,
    scope: null,
    token_type: null,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // auth: (state: Record<string, AuthState>, action: PayloadAction<AuthState>) => {
    //   state.clientAuth.access_token = action.payload.access_token;
    //   state.clientAuth.expires_in = action.payload.expires_in;
    //   state.clientAuth.scope = action.payload.scope;
    //   state.clientAuth.token_type = action.payload.token_type;
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(getClientAccessTokenAsync.pending, state => {
        state.clientAuth.status = 'pending';
      })
      .addCase(getClientAccessTokenAsync.fulfilled, (state, action) => {
        state.clientAuth.status = 'idle';
        state.clientAuth.access_token = action.payload.access_token;
        state.clientAuth.expires_in = action.payload.expires_in;
        state.clientAuth.scope = action.payload.scope;
        state.clientAuth.token_type = action.payload.token_type;

        console.log('Client', action.payload);
      })
      .addCase(getAnonymousAccessTokenAsync.pending, state => {
        state.anonymousAuth.status = 'pending';
      })
      .addCase(getAnonymousAccessTokenAsync.fulfilled, (state, action) => {
        state.anonymousAuth.status = 'idle';
        state.anonymousAuth.access_token = action.payload.access_token;
        state.anonymousAuth.expires_in = action.payload.expires_in;
        state.anonymousAuth.scope = action.payload.scope;
        state.anonymousAuth.token_type = action.payload.token_type;

        console.log('Anonymous', action.payload);
      })
      .addCase(getCustomerAccessTokenAsync.pending, state => {
        state.customerAuth.status = 'pending';
      })
      .addCase(getCustomerAccessTokenAsync.fulfilled, (state, action) => {
        state.customerAuth.status = 'idle';
        state.customerAuth.access_token = action.payload.access_token;
        state.customerAuth.expires_in = action.payload.expires_in;
        state.customerAuth.scope = action.payload.scope;
        state.customerAuth.token_type = action.payload.token_type;

        console.log('Customer', action.payload);
      });
  },
});

export const { actions: authActions } = authSlice;
