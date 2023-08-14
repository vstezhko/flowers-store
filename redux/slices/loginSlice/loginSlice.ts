import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCustomerAsync, loginAsync } from '@/redux/slices/loginSlice/thunks';

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
  reducers: {
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    removeMessage: (state: LoginState) => {
      state.message = '';
    },
  },
  extraReducers: builder => {
    const setCustomers = (state: LoginState, action: PayloadAction<LoginState>) => {
      state.status = 'idle';
      state.isLogin = true;
      state.customer = action.payload.customer;
      state.anonymousCart = action.payload.anonymousCart;
    };

    builder
      .addCase(loginAsync.pending, state => {
        state.status = 'pending';
      })
      .addCase(loginAsync.fulfilled, (state: LoginState, action: PayloadAction<LoginState>) => {
        setCustomers(state, action);
        state.message = 'Success login';
        state.variant = 'success';
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.message = action.error.message ? action.error.message : '';
        state.variant = 'error';
        state.isLogin = false;
      })
      .addCase(getCustomerAsync.fulfilled, (state: LoginState, action: PayloadAction<LoginState>) => {
        setCustomers(state, action);
        state.message = '';
        state.variant = 'success';
      });
  },
});

export const { actions: authActions } = loginSlice;
