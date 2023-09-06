import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { snackbarSlice, SnackbarState } from '@/redux/slices/snackbarSlice/snackbarSlice';

describe('snackbarSlice', () => {
  let store: EnhancedStore<{ snackbar: SnackbarState }>;

  beforeEach(() => {
    store = configureStore({ reducer: { snackbar: snackbarSlice.reducer } });
  });

  it('should handle removeMessage', () => {
    store.dispatch(snackbarSlice.actions.removeMessage());
    const state = store.getState().snackbar;
    expect(state.message).toBe('');
  });

  it('should handle setMessage', () => {
    const message = 'Test message';
    const variant = 'error';
    store.dispatch(snackbarSlice.actions.setMessage({ message, variant }));
    const state = store.getState().snackbar;
    expect(state.message).toBe(message);
    expect(state.variant).toBe(variant);
  });
});
