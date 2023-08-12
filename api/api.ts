// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const API_URL = 'https://api.europe-west1.gcp.commercetools.com';
const Auth_URL = 'https://auth.europe-west1.gcp.commercetools.com';
const CLIENT_ID = 'brQH_xH3k4pfrEPPkWdDm4V4';
const SECRET_KEY = 'nP9N2kwbOZU6cig6p1k20ULmdYfg7-u0';

const basicAuth = btoa(`${CLIENT_ID}:${SECRET_KEY}`);

const AuthApiInstance = axios.create({
  baseURL: Auth_URL,
  headers: {
    Authorization: `Basic ${basicAuth}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export const authPost = (url: string, body = {}) => AuthApiInstance.post(url, body).then(res => res.data);

const ApiInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export const get = (url: string, config = {}) => ApiInstance.get(url, config).then(res => res.data);
