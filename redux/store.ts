import { configureStore } from '@reduxjs/toolkit';
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from 'react-redux';
import { reducer } from '@/redux/rootReducer';
import authMiddleware from '@/redux/middleware/authMiddleware';
import notificationMiddleware from '@/redux/middleware/notificationMiddleware';

export const reduxStore = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(notificationMiddleware, authMiddleware),
});

export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

/* Types */
export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatch = typeof reduxStore.dispatch;
