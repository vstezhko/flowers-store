import { Middleware } from '@reduxjs/toolkit';
import { loginSlice } from '@/redux/slices/loginSlice/loginSlice';
import { signUpAsync } from '@/redux/slices/loginSlice/thunks';

const loginMiddleware: Middleware = store => next => action => {
  if (action.type === signUpAsync.rejected.type) {
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

  return next(action);
};
export default loginMiddleware;
