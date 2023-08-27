import { get, PROJECT_KEY } from '@/api/api';

const getCustomer = async (token: string) => {
  return get(`/${PROJECT_KEY}/me`, token);
};

// const updateCustomer = async (token: string, id: string) => {
//   const body = JSON.stringify({
//     grant_type: 'manage_my_profile',
//     scope: SCOPE,
//   });
//   return post(`/${PROJECT_KEY}/customers/${id}`, token, body);
// };

export const CustomerService = {
  getCustomer,
};
