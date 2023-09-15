import { Middleware } from '@reduxjs/toolkit';
import { snackbarSlice } from '@/redux/slices/snackbarSlice/snackbarSlice';
import {
  changePasswordAsync,
  getCustomerAsync,
  loginAsync,
  signUpAsync,
  updateCustomerAsync,
} from '@/redux/slices/loginSlice/thunks';
import { cartInteractionAsync, removeCartAsync } from '@/redux/slices/cartSlice/thunk';

const notificationMiddleware: Middleware = store => next => action => {
  if (action.type === getCustomerAsync.rejected.type) {
    return next(action);
  }
  if (
    (action.type === loginAsync.rejected.type || action.type === signUpAsync.rejected.type) &&
    action.error &&
    action.error.message === 'invalid_token'
  ) {
    store.dispatch(
      snackbarSlice.actions.setMessage({
        message: 'Oooops! Something went wrong... try one more time',
        variant: 'error',
      })
    );
    return next(action);
  }

  if (action.type === loginAsync.fulfilled.type) {
    const { isSignUp } = store.getState().login;
    store.dispatch(
      snackbarSlice.actions.setMessage({
        message: isSignUp ? "You've successfully registered and logged in" : 'Successful login',
        variant: 'success',
      })
    );

    return next(action);
  }

  if (action.type === changePasswordAsync.fulfilled.type) {
    store.dispatch(
      snackbarSlice.actions.setMessage({
        message: "You've successfully updated your password",
        variant: 'success',
      })
    );

    return next(action);
  }

  if (action.type === updateCustomerAsync.fulfilled.type) {
    const { isNewAddress } = store.getState().login;
    store.dispatch(
      snackbarSlice.actions.setMessage({
        message: isNewAddress && "You've successfully updated data",
        variant: 'success',
      })
    );
    return next(action);
  }

  if (action.type === cartInteractionAsync.fulfilled.type) {
    const { isRemoveItem } = store.getState().cart;
    store.dispatch(
      snackbarSlice.actions.setMessage({
        message: isRemoveItem && "You've successfully removed product from cart",
        variant: 'success',
      })
    );
    return next(action);
  }

  if (action.type === removeCartAsync.fulfilled.type) {
    store.dispatch(
      snackbarSlice.actions.setMessage({
        message: "You've successfully cleared cart",
        variant: 'success',
      })
    );
    return next(action);
  }

  if (action.meta?.requestStatus === 'rejected' && action.error.message) {
    store.dispatch(snackbarSlice.actions.setMessage({ message: action.error.message, variant: 'error' }));
  }

  return next(action);
};
export default notificationMiddleware;
