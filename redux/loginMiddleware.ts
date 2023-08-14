import { Middleware } from '@reduxjs/toolkit';
import { loginSlice } from '@/redux/slices/loginSlice/loginSlice';
import { loginAsync } from '@/redux/slices/loginSlice/thunks';

const loginMiddleware: Middleware = store => next => action => {
  if (action.type === loginAsync.pending.type) {
    store.dispatch(loginSlice.actions.setMessage({ message: '', variant: 'error' }));
  } else if (action.type === loginAsync.rejected.type) {
    if (action.error && action.error.message) {
      store.dispatch(loginSlice.actions.setMessage({ message: action.error.message, variant: 'error' }));
    }
  } else if (action.type === loginAsync.fulfilled.type) {
    store.dispatch(loginSlice.actions.setMessage({ message: 'successful login', variant: 'success' }));
  }

  return next(action);
};
export default loginMiddleware;
