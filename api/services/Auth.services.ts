import { authPost, post, PROJECT_KEY, SCOPE } from '@/api/api';
import { LoginValues } from '@/types/interface';

const getClientAccessToken = async () => {
  const body = {
    grant_type: 'client_credentials',
    scope: SCOPE,
  };
  return authPost(`oauth/token`, body);
};

const getAnonymousAccessToken = async () => {
  const body = {
    grant_type: 'client_credentials',
    scope: SCOPE,
  };
  return authPost(`/oauth/${PROJECT_KEY}/anonymous/token`, body);
};

const getCustomerAccessToken = async ({ username, password }: { username: string; password: string }) => {
  const body = {
    grant_type: 'password',
    username: username,
    password: password,
    scope: SCOPE,
  };

  return authPost(`/oauth/${PROJECT_KEY}/customers/token`, body);
};

const login = async (values: LoginValues, token: string) => {
  const body = JSON.stringify({
    scope: SCOPE,
    email: values.email,
    password: values.password,
  });

  return post(`/${PROJECT_KEY}/me/login`, token, body);
};

export const AuthService = {
  getClientAccessToken,
  getAnonymousAccessToken,
  getCustomerAccessToken,
  login,
};
