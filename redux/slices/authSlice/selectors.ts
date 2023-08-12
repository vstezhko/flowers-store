import { ReduxState } from '@/redux/store';

export const selectClientToken = (state: ReduxState) => state.auth.clientAuth.access_token;
export const selectAnonymousToken = (state: ReduxState) => state.auth.anonymousAuth.access_token;

export const selectCustomerToken = (state: ReduxState) => state.auth.customerAuth.access_token;
