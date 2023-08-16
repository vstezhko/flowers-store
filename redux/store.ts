import { configureStore } from '@reduxjs/toolkit';
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from 'react-redux';
import { reducer } from '@/redux/rootReducer';
import loginMiddleware from '@/redux/middleware/loginMiddleware';
import authMiddleware from '@/redux/middleware/authMiddleware';
import signUpMiddleware from '@/redux/middleware/signUpMiddleware';

export const reduxStore = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(loginMiddleware, signUpMiddleware, authMiddleware),
});

export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

/* Types */
export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatch = typeof reduxStore.dispatch;
