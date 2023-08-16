import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCustomerAsync, loginAsync, sighUpAsync } from '@/redux/slices/loginSlice/thunks';

interface LoginState {
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  isLogin: boolean;
  customer: Customer;
  anonymousCart?: {
    id: string | null;
    typeId: string | null;
  };
  message: string;
  variant: 'error' | 'success';
}

interface Customer {
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
    removeCustomer: state => {
      state.customer = {
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
      };
    },
    setMessage: (state: LoginState, action) => {
      state.message = action.payload.message;
      state.variant = action.payload.variant;
    },
  },
  extraReducers: builder => {
    const setCustomers = (state: LoginState, action: PayloadAction<Customer>) => {
      state.customer = action.payload;
    };

    builder
      .addCase(loginAsync.pending, state => {
        state.status = 'pending';
      })
      .addCase(loginAsync.fulfilled, (state: LoginState) => {
        state.isLogin = true;
      })
      .addCase(loginAsync.rejected, state => {
        state.isLogin = false;
      })
      .addCase(sighUpAsync.fulfilled, (state: LoginState, action: PayloadAction<Customer>) => {
        setCustomers(state, action);
      })
      .addCase(getCustomerAsync.fulfilled, (state: LoginState, action: PayloadAction<Customer>) => {
        setCustomers(state, action);
        state.message = '';
      });
  },
});

export const { actions: authActions } = loginSlice;
