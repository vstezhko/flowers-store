import { ReduxState } from '@/redux/store';

export const selectClientToken = (state: ReduxState) => state.auth.access_token;
