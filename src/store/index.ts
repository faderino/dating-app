import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { api } from '../services/api';
import authReducer from './auth/authSlice';
import { handleUnauthorized } from './middlewares/errorHandler';
import logger from 'redux-logger';

const middlewares = [api.middleware, handleUnauthorized];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
