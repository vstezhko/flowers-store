import { getAccessToken } from '@/redux/slices/authSlice/getAccessToken';
import { createAppAsyncThunk } from '@/redux/createAppAsyncThunk';

const client_id = 'brQH_xH3k4pfrEPPkWdDm4V4';
const secret = 'nP9N2kwbOZU6cig6p1k20ULmdYfg7-u0';
const scope =
  'manage_my_quotes:flowers-store manage_my_quote_requests:flowers-store manage_my_payments:flowers-store manage_my_orders:flowers-store view_published_products:flowers-store manage_my_business_units:flowers-store manage_my_shopping_lists:flowers-store view_orders:flowers-store manage_my_profile:flowers-store create_anonymous_token:flowers-store view_messages:flowers-store view_categories:flowers-store';
export const getAccessToken1 = async () => {
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    scope: scope,
  }).toString();

  const basicAuth = btoa(`${client_id}:${secret}`);
  const response = await fetch('https://auth.europe-west1.gcp.commercetools.com/oauth/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });
  return response.json();
};

export const getAccessTokenAsync = createAppAsyncThunk('auth/getAccessToken', async () => {
  return getAccessToken();
});
