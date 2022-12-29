import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { baseApi } from '../services/baseApi';
import authReducer from './auth/authSlice';
import { handleUnauthorized } from './middlewares/errorHandler';
import logger from 'redux-logger';
import registerFormReducer from './registerForm/registerFormSlice';
import profileReducer from './profile/profileSlice';

const middlewares = [baseApi.middleware, handleUnauthorized];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    registerForm: registerFormReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(middlewares),
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
