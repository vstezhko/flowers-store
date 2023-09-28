import { authPost, post, PROJECT_KEY, SCOPE } from '@/api/api';
import { customerDraft } from '@/types/interface';

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

const refreshCustomerAccessToken = async (refreshToken: string) => {
  const body = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  };

  return authPost(`/oauth/${PROJECT_KEY}/customers/token`, body);
};

const refreshAnonymousAccessToken = async (refreshToken: string) => {
  const body = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  };

  return authPost(`/oauth/${PROJECT_KEY}/anonymous/token`, body);
};

const login = async (values: Record<string, string | boolean>, token: string) => {
  const { email, password } = values;
  const body = JSON.stringify({
    scope: SCOPE,
    email,
    password,
  });

  return post(`/${PROJECT_KEY}/me/login`, token, body);
};

const signUp = async (values: customerDraft, token: string) => {
  const body = JSON.stringify(values);
  return post(`/${PROJECT_KEY}/me/signup`, token, body);
};

export const AuthService = {
  getClientAccessToken,
  getAnonymousAccessToken,
  getCustomerAccessToken,
  refreshCustomerAccessToken,
  refreshAnonymousAccessToken,
  login,
  signUp,
};
