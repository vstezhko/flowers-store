import { get, PROJECT_KEY } from '@/api/api';

const getCustomer = async (token: string) => {
  return get(`/${PROJECT_KEY}/me`, token);
};

export const CustomerService = {
  getCustomer,
};
