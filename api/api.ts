// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { generateUrlSearchParams } from '@/utils/generateUrlSearchParams';

const API_URL = 'https://api.europe-west1.gcp.commercetools.com';
const Auth_URL = 'https://auth.europe-west1.gcp.commercetools.com';
const CLIENT_ID = 'S431txCLRt08ojpFOSqFby3O';
const SECRET_KEY = 'txRXWh8btqPaPkzrmCJzwUunS9btca67';
export const SCOPE =
  'manage_my_quotes:flowers-store manage_my_quote_requests:flowers-store manage_my_payments:flowers-store view_published_products:flowers-store manage_my_business_units:flowers-store view_categories:flowers-store manage_my_shopping_lists:flowers-store view_products:flowers-store manage_my_profile:flowers-store create_anonymous_token:flowers-store manage_my_orders:flowers-store view_product_selections:flowers-store';
export const PROJECT_KEY = 'flowers-store';

const basicAuth = btoa(`${CLIENT_ID}:${SECRET_KEY}`);

const AuthApiInstance = axios.create({
  baseURL: Auth_URL,
  headers: {
    Authorization: `Basic ${basicAuth}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export const authPost = (url: string, body = {}) =>
  AuthApiInstance.post(url, generateUrlSearchParams(body)).then(res => res.data);

export const ApiInstance = (token: string) => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const get = (url: string, token: string) =>
  ApiInstance(token)
    .get(url)
    .then(res => res.data)
    .catch(error => {
      return Promise.reject(error.response.data.message);
    });

export const post = (url: string, token: string, body: string) =>
  ApiInstance(token)
    .post(url, body)
    .then(res => res.data)
    .catch(error => {
      return Promise.reject(error.response.data.message);
    });
