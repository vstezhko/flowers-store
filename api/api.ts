import axios from 'axios';
import { generateUrlSearchParams } from '@/utils/generateUrlSearchParams';

const API_URL = 'https://api.europe-west1.gcp.commercetools.com';
const Auth_URL = 'https://auth.europe-west1.gcp.commercetools.com';
const CLIENT_ID = 'kbbRxhyKvmXcSbGUmdqY5gan';
const SECRET_KEY = 'uj8P-aFgXjtKOeDhNyqs5cNAn5xNTyIy';
export const SCOPE =
  'manage_my_quotes:flowersstore create_anonymous_token:flowersstore manage_my_business_units:flowersstore manage_my_shopping_lists:flowersstore manage_products:flowersstore view_product_selections:flowersstore manage_categories:flowersstore view_messages:flowersstore manage_my_profile:flowersstore manage_shopping_lists:flowersstore manage_discount_codes:flowersstore manage_customers:flowersstore manage_my_payments:flowersstore manage_payments:flowersstore manage_my_orders:flowersstore manage_cart_discounts:flowersstore view_products:flowersstore manage_business_units:flowersstore manage_quote_requests:flowersstore manage_orders:flowersstore';
export const PROJECT_KEY = 'flowersstore';

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
      return Promise.reject(error.response ? error.response.data.message : error.message);
    });

export const post = (url: string, token: string, body: string) =>
  ApiInstance(token)
    .post(url, body)
    .then(res => res.data)
    .catch(error => {
      return Promise.reject(error.response ? error.response.data.message : error.message);
    });

export const remove = (url: string, token: string) =>
  ApiInstance(token)
    .delete(url)
    .then(res => res.data)
    .catch(error => {
      return Promise.reject(error.response ? error.response.data.message : error.message);
    });
