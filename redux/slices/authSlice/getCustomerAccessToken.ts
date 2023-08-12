import { authPost } from '@/api/api';

const SCOPE =
  'manage_my_quotes:flowers-store manage_my_quote_requests:flowers-store manage_my_payments:flowers-store view_published_products:flowers-store manage_my_business_units:flowers-store view_categories:flowers-store manage_my_shopping_lists:flowers-store view_products:flowers-store manage_my_profile:flowers-store create_anonymous_token:flowers-store manage_my_orders:flowers-store view_product_selections:flowers-store';
const PROJECT_KEY = 'flowers-store';
export const getCustomerAccessToken = async () => {
  const body = {
    grant_type: 'password',
    username: 'viktoriastezhko@gmail.com',
    password: '123',
    scope: SCOPE,
  };

  return authPost(`/oauth/${PROJECT_KEY}/customers/token`, body);
};
