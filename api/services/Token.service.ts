import { reduxStore } from '@/redux/store';

const setAccessTokenToLS = (token: string, type: string) => {
  console.log(type);
  const tokenWithType = JSON.stringify({
    type,
    token,
  });
  localStorage.setItem('access_token', tokenWithType);
};

const getAccessTokenFromLS = () =>
  localStorage.getItem('access_token') ? JSON.parse(<string>localStorage.getItem('access_token')) : null;

const removeAccessTokenFromLS = () => localStorage.removeItem('access_token');

const getAccessToken = () => {
  const { auth } = reduxStore.getState();
  const tokenFromLS = getAccessTokenFromLS();
  return auth.access_token || tokenFromLS?.token;
};

export const TokenService = {
  getAccessToken,
  setAccessTokenToLS,
  getAccessTokenFromLS,
  removeAccessTokenFromLS,
};
