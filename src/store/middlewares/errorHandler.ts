import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { logout } from '../auth/authSlice';
import { HttpStatusCode } from '../../types/httpStatus';
import { ResponseAPI } from '../../types/api';

export const handleUnauthorized: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (
      isRejectedWithValue(action) &&
      action.payload.status === HttpStatusCode.Unauthorized
    ) {
      const resp = action.payload.data as ResponseAPI;
      toast.error(resp.message, { theme: 'colored' });
      if (action.meta.arg.endpointName === 'login') {
        return next(action);
      }
      api.dispatch(logout());
    }

    return next(action);
  };
