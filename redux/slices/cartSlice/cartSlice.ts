import { createSlice, isAnyOf, isFulfilled } from '@reduxjs/toolkit';
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
    builder
      .addMatcher(isAnyOf(createCartAsync.pending, addToCartAsync.pending, getCartAsync.pending), state => {
        state.status = 'pending';
      })
      .addMatcher(isAnyOf(createCartAsync.fulfilled, addToCartAsync.fulfilled), (state, action) => {
        state.status = 'idle';
        state.cartId = action.payload.cartId;
        state.version = action.payload.version;
      })
      .addMatcher(isFulfilled(getCartAsync), (state, action) => {
        state.status = 'idle';
        state.cartProductsIds = [...action.payload];
      })
      .addMatcher(isAnyOf(createCartAsync.rejected, addToCartAsync.rejected, getCartAsync.rejected), state => {
        state.status = 'failed';
      });
  },
});

export const { actions } = cartSlice;
