import { Middleware } from '@reduxjs/toolkit';
import { loginSlice } from '@/redux/slices/loginSlice/loginSlice';
import { sighUpAsync } from '@/redux/slices/loginSlice/thunks';

const loginMiddleware: Middleware = store => next => action => {
  if (action.type === sighUpAsync.rejected.type) {
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
  }

  // else if (action.type === sighUpAsync.fulfilled.type) {
  //   store.dispatch(loginSlice.actions.setMessage({ message: 'successful registration', variant: 'success' }));
  // }

  return next(action);
};
export default loginMiddleware;
