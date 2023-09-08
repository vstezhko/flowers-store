import { Middleware } from '@reduxjs/toolkit';
import { TokenService } from '@/api/services/Token.service';
import { AuthService } from '@/api/services/Auth.services';
import { authSlice } from '@/redux/slices/authSlice';
import { TokenType } from '@/types/enums';
import { snackbarSlice } from '@/redux/slices/snackbarSlice/snackbarSlice';

const authMiddleware: Middleware = store => next => action => {
  if (action.error && action.error.message === 'invalid_token') {
    const accessToken = TokenService.getAccessTokenFromLS();
    const refreshToken = TokenService.getRefreshTokenFromLS();

    if (accessToken.type === TokenType.CLIENT) {
      AuthService.getClientAccessToken()
        .then(response => {
          store.dispatch(
            authSlice.actions.setAccessToken({
              ...response,
              tokenType: accessToken.type,
            })
          );
        })
        .catch(newError => {
          console.log(newError);
          TokenService.removeTokensFromLS();
          return;
        });
    }

    if (accessToken.type === TokenType.CUSTOMER && refreshToken?.type === TokenType.CUSTOMER) {
      AuthService.refreshCustomerAccessToken(refreshToken.token)
        .then(response => {
          store.dispatch(
            authSlice.actions.setAccessToken({
              ...response,
              tokenType: refreshToken.type,
            })
          );
        })
        .catch(newError => {
          console.log(newError);
          TokenService.removeTokensFromLS();
          return;
        });
    }

    if (accessToken.type === TokenType.ANONYMOUS && refreshToken?.type === TokenType.ANONYMOUS) {
      AuthService.refreshAnonymousAccessToken(refreshToken.token)
        .then(response => {
          store.dispatch(
            authSlice.actions.setAccessToken({
              ...response,
              tokenType: refreshToken.type,
            })
          );
        })
        .catch(newError => {
          console.log(newError);
          TokenService.removeTokensFromLS();
          return;
        });
    }
  }

  if (action.type === 'auth/setAccessToken') {
    store.dispatch(
      snackbarSlice.actions.setMessage({
        message: 'try one more time',
        variant: 'success',
      })
    );
  }

  return next(action);
};
export default authMiddleware;
