import { Middleware } from '@reduxjs/toolkit';
import { TokenService } from '@/api/services/Token.service';
import { AuthService } from '@/api/services/Auth.services';
import { authSlice } from '@/redux/slices/authSlice';
import { TokenType } from '@/types/enums';
import { snackbarSlice } from '@/redux/slices/snackbarSlice/snackbarSlice';
import { loginSlice } from '@/redux/slices/loginSlice/loginSlice';
import { CartService } from '@/api/services/Cart.services';

const authMiddleware: Middleware = store => next => action => {
  if (action.error && action.error.message === 'invalid_token') {
    const accessToken = TokenService.getAccessTokenFromLS();
    const refreshToken = TokenService.getRefreshTokenFromLS();

    if (accessToken?.type === TokenType.CLIENT) {
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
    if (refreshToken) {
      if (refreshToken.type === TokenType.CUSTOMER) {
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
      } else if (refreshToken.type === TokenType.ANONYMOUS) {
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
    } else {
      TokenService.removeTokensFromLS();
      CartService.removeCartFromLS();
      store.dispatch(loginSlice.actions.setIsLogin(false));
      store.dispatch(loginSlice.actions.setIsSignUp(false));
      store.dispatch(loginSlice.actions.removeCustomer());
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
