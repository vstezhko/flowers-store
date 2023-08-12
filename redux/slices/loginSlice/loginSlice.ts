import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginAsync } from '@/redux/slices/loginSlice/thunks';

interface LoginState {
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
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
}

const initialState: LoginState = {
  status: 'idle',
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
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    const setCustomers = (state: LoginState, action: PayloadAction<LoginState>) => {
      state.status = 'idle';
      state.customer = action.payload.customer;
      state.anonymousCart = action.payload.anonymousCart;
    };

    builder
      .addCase(loginAsync.pending, state => {
        state.status = 'pending';
      })
      .addCase(loginAsync.fulfilled, setCustomers);
  },
});

export const { actions: authActions } = loginSlice;
