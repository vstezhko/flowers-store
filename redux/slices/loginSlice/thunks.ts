import { createAppAsyncThunk } from '@/redux/createAppAsyncThunk';
import { post, PROJECT_KEY, SCOPE } from '@/api/api';

interface LoginValues {
  email: string;
  password: string;
}

const login = async (values: LoginValues, token: string) => {
  const body = JSON.stringify({
    scope: SCOPE,
    email: values.email,
    password: values.password,
  });

  return post(`/${PROJECT_KEY}/me/login`, token, body);
};
export const loginAsync = createAppAsyncThunk(
  'login/login',
  async ({ values, token }: { values: LoginValues; token: string }) => {
    return login(values, token);
  }
);
