import { createAppAsyncThunk } from '@/redux/createAppAsyncThunk';
import { AuthService } from '@/api/services/Auth.services';
import { LoginValues } from '@/types/interface';
import { CustomerService } from '@/api/services/Customer.service';

export const loginAsync = createAppAsyncThunk(
  'login/login',
  async ({ values, token }: { values: LoginValues; token: string }) => {
    return AuthService.login(values, token);
  }
);

export const getCustomerAsync = createAppAsyncThunk('login/getCustomer', async (token: string) => {
  return CustomerService.getCustomer(token);
});
