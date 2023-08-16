import { createAppAsyncThunk } from '@/redux/createAppAsyncThunk';
import { AuthService } from '@/api/services/Auth.services';
import { CustomerService } from '@/api/services/Customer.service';

export const loginAsync = createAppAsyncThunk(
  'login/login',
  async ({ loginPayload, token }: { loginPayload: Record<string, string>; token: string }) => {
    return AuthService.login(loginPayload, token);
  }
);
export const sighUpAsync = createAppAsyncThunk(
  'login/signup',
  async ({ signUpPayload, token }: { signUpPayload: Record<string, string>; token: string }) => {
    return AuthService.signUp(signUpPayload, token);
  }
);

export const getCustomerAsync = createAppAsyncThunk('login/getCustomer', async (token: string) => {
  return CustomerService.getCustomer(token);
});
