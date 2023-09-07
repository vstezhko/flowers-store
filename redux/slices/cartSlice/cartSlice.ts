import { createSlice } from '@reduxjs/toolkit';
import { createCartAsync } from './thunk';

export interface CartState {
  status: 'idle' | 'pending' | 'succeeded' | 'failed' | undefined;
}

export const initialState: CartState = {
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

    builder.addCase(createCartAsync.fulfilled, state => {
      state.status = 'idle';
    });

    builder.addCase(createCartAsync.rejected, state => {
      state.status = 'failed';
    });
  },
});

export const { actions } = cartSlice;
