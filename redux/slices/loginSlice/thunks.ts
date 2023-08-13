import { createAppAsyncThunk } from '@/redux/createAppAsyncThunk';
import { AuthService } from '@/api/services/Auth.services';
import { LoginValues } from '@/types/interface';

export const loginAsync = createAppAsyncThunk(
  'login/login',
  async ({ values, token }: { values: LoginValues; token: string }) => {
    return AuthService.login(values, token);
  }
);
