import { reduxStore } from '@/redux/store';

const setAccessTokenToLS = (token: string, type: string) => {
  const tokenWithType = JSON.stringify({
    type,
    token,
  });
  localStorage.setItem('access_token', tokenWithType);
};
const setRefreshTokenToLS = (token: string, type: string) => {
  const tokenWithType = JSON.stringify({
    type,
    token,
  });
  localStorage.setItem('refresh_token', tokenWithType);
};

const getAccessTokenFromLS = () =>
  localStorage.getItem('access_token') ? JSON.parse(<string>localStorage.getItem('access_token')) : null;
const getRefreshTokenFromLS = () =>
  localStorage.getItem('refresh_token') ? JSON.parse(<string>localStorage.getItem('refresh_token')) : null;

const removeTokensFromLS = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

const getAccessToken = () => {
  const { auth } = reduxStore.getState();
  const tokenFromLS = getAccessTokenFromLS();
  return auth.access_token || tokenFromLS?.token;
};

export const TokenService = {
  getAccessToken,
  setAccessTokenToLS,
  setRefreshTokenToLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  removeTokensFromLS,
};
