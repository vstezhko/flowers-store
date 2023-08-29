import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCustomerAsync, loginAsync, signUpAsync, updateCustomerAsync } from '@/redux/slices/loginSlice/thunks';

export interface LoginState {
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  isLogin: boolean;
  isSignUp: boolean;
  customer: Customer;
  anonymousCart?: {
    id: string | null;
    typeId: string | null;
  };
}

export interface Customer {
  addresses: ICustomerAddress[];
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
  dateOfBirth: string | null;
  defaultShippingAddressId: string | null;
  defaultBillingAddressId: string | null;
  billingAddressIds: string[];
  shippingAddressIds: string[];
}

export interface ICustomerAddress {
  city: string;
  country: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  mobile: string;
  phone: string;
  postalCode: string;
  streetName: string;
  building: string;
  title: string;
  apartment: string;
}

export const initialState: LoginState = {
  status: 'idle',
  isLogin: false,
  isSignUp: false,
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
    dateOfBirth: null,
    defaultShippingAddressId: null,
    defaultBillingAddressId: null,
    billingAddressIds: [],
    shippingAddressIds: [],
  },
  anonymousCart: {
    id: null,
    typeId: null,
  },
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setIsSignUp: (state, action: PayloadAction<boolean>) => {
      state.isSignUp = action.payload;
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
        dateOfBirth: null,
        defaultShippingAddressId: null,
        defaultBillingAddressId: null,
        billingAddressIds: [],
        shippingAddressIds: [],
      };
    },
    updateCustomer: (state, action: PayloadAction<Partial<Customer>>) => {
      state.customer = {
        ...state.customer,
        ...action.payload,
      };
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
      .addCase(signUpAsync.fulfilled, (state: LoginState, action: PayloadAction<Customer>) => {
        state.isSignUp = true;
        setCustomers(state, action);
      })
      .addCase(signUpAsync.rejected, state => {
        state.isSignUp = false;
      })
      .addCase(getCustomerAsync.fulfilled, (state: LoginState, action: PayloadAction<Customer>) => {
        setCustomers(state, action);
      })
      .addCase(updateCustomerAsync.fulfilled, (state: LoginState, action: PayloadAction<Partial<Customer>>) => {
        state.customer = {
          ...state.customer,
          ...action.payload,
        };
      });
  },
});

export const { actions } = loginSlice;
