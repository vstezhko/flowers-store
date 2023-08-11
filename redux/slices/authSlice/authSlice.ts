import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAccessTokenAsync } from '@/redux/slices/authSlice/thunks';

interface AuthState {
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  access_token: string | null;
  expires_in: number | null;
  scope: string | null;
  token_type: string | null;
}

const initialState: AuthState = {
  status: 'idle',
  access_token: null,
  expires_in: null,
  scope: null,
  token_type: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    auth: (state: AuthState, action: PayloadAction<AuthState>) => {
      state.access_token = action.payload.access_token;
      state.expires_in = action.payload.expires_in;
      state.scope = action.payload.scope;
      state.token_type = action.payload.token_type;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAccessTokenAsync.pending, state => {
        state.status = 'pending';
      })
      .addCase(getAccessTokenAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.access_token = action.payload.access_token;
        state.expires_in = action.payload.expires_in;
        state.scope = action.payload.scope;
        state.token_type = action.payload.token_type;
      });
  },
});

export const { actions: authActions } = authSlice;
