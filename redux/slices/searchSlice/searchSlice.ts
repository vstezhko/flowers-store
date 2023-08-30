import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    setSearch: (state, action) => action.payload,
  },
});

export const { actions } = searchSlice;
