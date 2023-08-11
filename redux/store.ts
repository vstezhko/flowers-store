import { configureStore } from '@reduxjs/toolkit';
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from 'react-redux';
import { reducer } from '@/redux/rootReducer';

// const serializableMiddleware = createSerializableStateInvariantMiddleware({
//   ignoredActionPaths: ['payload.headers'],
// });

export const reduxStore = configureStore({
  reducer: reducer,
  // middleware: [serializableMiddleware],
});

export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

/* Types */
export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatch = typeof reduxStore.dispatch;
