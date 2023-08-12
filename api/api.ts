// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { generateUrlSearchParams } from '@/utils/generateUrlSearchParams';

const API_URL = 'https://api.europe-west1.gcp.commercetools.com';
const Auth_URL = 'https://auth.europe-west1.gcp.commercetools.com';
const CLIENT_ID = 'S431txCLRt08ojpFOSqFby3O';
const SECRET_KEY = 'txRXWh8btqPaPkzrmCJzwUunS9btca67';

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

// const get = (url: string, token: string) =>
//   ApiInstance(token)
//     .get(url, {})
//     .then(res => res.data);
//
// const post = (url: string, token: string, body: object) =>
//   ApiInstance(token)
//     .get(url, body)
//     .then(res => res.data);
