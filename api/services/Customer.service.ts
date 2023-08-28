import { get, post, PROJECT_KEY } from '@/api/api';

const getCustomer = async (token: string) => {
  return get(`/${PROJECT_KEY}/me`, token);
};

const updateCustomer = async (token: string, version: number | null, actions: Record<string, string | undefined>[]) => {
  const body = JSON.stringify({
    grant_type: 'manage_my_profile',
    version: version,
    actions: actions,
  });
  return post(`/${PROJECT_KEY}/me`, token, body);
};

export const CustomerService = {
  getCustomer,
  updateCustomer,
};
