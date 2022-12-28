import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { logout } from '../auth/authSlice';
import { HttpStatusCode } from '../../types/httpStatus';
import { baseApi } from '../../services/baseApi';

export const handleUnauthorized: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (
      isRejectedWithValue(action) &&
      action.payload.status === HttpStatusCode.Unauthorized
    ) {
      if (action.meta.arg.endpointName === 'login') {
        return next(action);
      }
      api.dispatch(baseApi.util.resetApiState());
      api.dispatch(logout());
    }

    return next(action);
  };
