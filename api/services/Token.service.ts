import { reduxStore } from '@/redux/store';

const getAccessToken = () => {
  const { auth } = reduxStore.getState();
  return auth.access_token || localStorage.getItem('access_token');
};

const setAccessTokenToLS = (token: string) => {
  localStorage.setItem('access_token', token);
};

const getAccessTokenFromLS = () => localStorage.getItem('access_token');

const removeAccessTokenFromLS = () => localStorage.removeItem('access_token');

export const TokenService = {
  getAccessToken,
  setAccessTokenToLS,
  getAccessTokenFromLS,
  removeAccessTokenFromLS,
};
