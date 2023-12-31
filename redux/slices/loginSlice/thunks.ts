import { createAppAsyncThunk } from '@/redux/createAppAsyncThunk';
import { AuthService } from '@/api/services/Auth.services';
import { CustomerService } from '@/api/services/Customer.service';
import { customerDraft, IChangePassword } from '@/types/interface';
import { UpdateCustomerData } from '@/types/types';

export const loginAsync = createAppAsyncThunk(
  'login/login',
  async ({ loginPayload, token }: { loginPayload: Record<string, string | boolean>; token: string }) => {
    return AuthService.login(loginPayload, token);
  }
);
export const signUpAsync = createAppAsyncThunk(
  'login/signup',
  async ({ signUpPayload, token }: { signUpPayload: customerDraft; token: string }) => {
    return AuthService.signUp(signUpPayload, token);
  }
);

export const getCustomerAsync = createAppAsyncThunk('login/getCustomer', async (token: string) => {
  return CustomerService.getCustomer(token);
});

export const updateCustomerAsync = createAppAsyncThunk(
  'login/updateCustomer',
  async ({ actions, token, version }: { actions: UpdateCustomerData; token: string; version: number | null }) => {
    return CustomerService.updateCustomer(token, version, actions);
  }
);

export const changePasswordAsync = createAppAsyncThunk(
  'login/changePassword',
  async ({ passwords, token, version }: { passwords: IChangePassword; token: string; version: number | null }) => {
    return CustomerService.changePassword(token, version, passwords);
  }
);
