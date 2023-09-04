import { get, post, PROJECT_KEY } from '@/api/api';
import { UpdateCustomerData } from '@/types/types';
import { IChangePassword } from '@/types/interface';

const getCustomer = async (token: string) => {
  return get(`/${PROJECT_KEY}/me`, token);
};

const updateCustomer = async (token: string, version: number | null, actions: UpdateCustomerData) => {
  const body = JSON.stringify({
    grant_type: 'manage_my_profile',
    version: version,
    actions: actions,
  });
  return post(`/${PROJECT_KEY}/me`, token, body);
};

const changePassword = async (token: string, version: number | null, data: IChangePassword) => {
  const body = JSON.stringify({
    grant_type: 'manage_my_profile',
    version: version,
    currentPassword: data.currentPassword,
    newPassword: data.newPassword,
  });

  return post(`/${PROJECT_KEY}/me/password`, token, body);
};

export const CustomerService = {
  getCustomer,
  updateCustomer,
  changePassword,
};
