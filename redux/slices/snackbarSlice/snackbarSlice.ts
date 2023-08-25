import { createSlice } from '@reduxjs/toolkit';

export interface SnackbarState {
  message: string;
  variant: 'error' | 'success' | 'default' | 'warning' | 'info' | undefined;
}

export const initialState: SnackbarState = {
  message: '',
  variant: undefined,
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setMessage: (state: SnackbarState, action) => {
      state.message = action.payload.message;
      state.variant = action.payload.variant;
    },
    removeMessage: (state: SnackbarState) => {
      state.message = '';
      state.variant = undefined;
    },
  },
});

export const { actions } = snackbarSlice;
