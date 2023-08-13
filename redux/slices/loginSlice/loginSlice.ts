import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginAsync } from '@/redux/slices/loginSlice/thunks';

interface LoginState {
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  isLogin: boolean;
  customer: {
    addresses: [];
    email: string | null;
    firstName: string | null;
    id: string | null;
    isEmailVerified: boolean;
    lastName: string | null;
    password: string | null;
    version: number | null;
    createdAt: string | null;
    lastModifiedAt: string | null;
    authenticationMode: string | null;
  };
  anonymousCart?: {
    id: string | null;
    typeId: string | null;
  };
  message: string;
  variant: 'error' | 'success';
}

const initialState: LoginState = {
  status: 'idle',
  isLogin: false,
  customer: {
    addresses: [],
    email: null,
    firstName: null,
    id: null,
    isEmailVerified: false,
    lastName: null,
    password: null,
    version: null,
    createdAt: null,
    lastModifiedAt: null,
    authenticationMode: null,
  },
  anonymousCart: {
    id: null,
    typeId: null,
  },
  message: '',
  variant: 'success',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    const setCustomers = (state: LoginState, action: PayloadAction<LoginState>) => {
      state.status = 'idle';
      state.isLogin = true;
      state.customer = action.payload.customer;
      state.anonymousCart = action.payload.anonymousCart;
      state.message = 'Success login';
      state.variant = 'success';
    };

    builder
      .addCase(loginAsync.pending, state => {
        state.status = 'pending';
      })
      .addCase(loginAsync.fulfilled, setCustomers)
      .addCase(loginAsync.rejected, (state, action) => {
        state.message = action.error.message ? action.error.message : '';
        state.variant = 'error';
        state.isLogin = false;
      });
  },
});

export const { actions: authActions } = loginSlice;
