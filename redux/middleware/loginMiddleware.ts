import { Middleware } from '@reduxjs/toolkit';
import { loginSlice } from '@/redux/slices/loginSlice/loginSlice';
import { loginAsync } from '@/redux/slices/loginSlice/thunks';

const loginMiddleware: Middleware = store => next => action => {
  if (action.type === loginAsync.rejected.type) {
    if (action.error && action.error.message === 'invalid_token') {
      store.dispatch(
        loginSlice.actions.setMessage({
          message: 'Oooops! Something went wrong...',
          variant: 'error',
        })
      );
    } else {
      store.dispatch(loginSlice.actions.setMessage({ message: action.error.message, variant: 'error' }));
    }
  } else if (action.type === loginAsync.fulfilled.type) {
    const { isSignUp } = store.getState().login;
    if (isSignUp) {
      store.dispatch(
        loginSlice.actions.setMessage({
          message: "You've successfully registered and logged in",
          variant: 'success',
        })
      );
    } else {
      store.dispatch(loginSlice.actions.setMessage({ message: 'successful login', variant: 'success' }));
    }
  }

  return next(action);
};
export default loginMiddleware;
