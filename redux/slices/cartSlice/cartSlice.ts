import { createSlice } from '@reduxjs/toolkit';
import { addToCartAsync, createCartAsync, getCartAsync } from './thunk';

export interface Cart {
  cartId: string | null;
  version: number | null;
  cartProductsIds: string[];
}

export interface CartState extends Cart {
  status: 'idle' | 'pending' | 'succeeded' | 'failed' | undefined;
}

export const initialState: CartState = {
  cartId: null,
  version: null,
  cartProductsIds: [],
  status: 'idle',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createCartAsync.pending, state => {
      state.status = 'pending';
    });

    builder.addCase(createCartAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.cartId = action.payload.cartId;
      state.version = action.payload.version;
    });

    builder.addCase(createCartAsync.rejected, state => {
      state.status = 'failed';
    });

    builder.addCase(addToCartAsync.pending, state => {
      state.status = 'pending';
    });

    builder.addCase(addToCartAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.cartId = action.payload.cartId;
      state.version = action.payload.version;
    });

    builder.addCase(addToCartAsync.rejected, state => {
      state.status = 'failed';
    });

    builder.addCase(getCartAsync.pending, state => {
      state.status = 'pending';
    });

    builder.addCase(getCartAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.cartProductsIds = [...action.payload];
    });

    builder.addCase(getCartAsync.rejected, state => {
      state.status = 'failed';
    });
  },
});

export const { actions } = cartSlice;
