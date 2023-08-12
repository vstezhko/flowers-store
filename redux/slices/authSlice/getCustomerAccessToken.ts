import { authPost } from '@/api/api';

const SCOPE = 'view_products:flowers-store';
const PROJECT_KEY = 'flowers-store';
export const getCustomerAccessToken = async () => {
  const body = {
    grant_type: 'password',
    username: 'viktoriastezhko@gmail.com',
    password: '123',
    scope: SCOPE,
  };

  return authPost(`/oauth/${PROJECT_KEY}/customers/token`, body);
};
