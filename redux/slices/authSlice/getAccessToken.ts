import { authPost } from '@/api/api';

const SCOPE =
  'manage_my_quotes:flowers-store manage_my_quote_requests:flowers-store manage_my_payments:flowers-store manage_my_orders:flowers-store view_published_products:flowers-store manage_my_business_units:flowers-store manage_my_shopping_lists:flowers-store view_orders:flowers-store manage_my_profile:flowers-store create_anonymous_token:flowers-store view_messages:flowers-store view_categories:flowers-store';

export const getAccessToken = async () => {
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    scope: SCOPE,
  }).toString();
  return authPost('/oauth/token', body);
};
