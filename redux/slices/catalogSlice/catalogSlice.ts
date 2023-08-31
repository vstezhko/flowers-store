import { createSlice } from '@reduxjs/toolkit';
import { getProductsAsync } from './thunks';

export interface ProductsState {
  status: 'idle' | 'pending' | 'succeeded' | 'failed' | undefined;
}

export const initialState: ProductsState = {
  status: 'idle',
};

export const searchSlice = createSlice({
  name: 'catalog',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProductsAsync.pending, state => {
      state.status = 'pending';
    });

    builder.addCase(getProductsAsync.fulfilled, state => {
      state.status = 'idle';
    });

    builder.addCase(getProductsAsync.rejected, state => {
      state.status = 'failed';
    });
  },
});

export const { actions } = searchSlice;
