import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// const baseQueryWithAuth: BaseQueryFn = async (args, api, extraOptions) => {
//   const result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === HttpStatusCode.Unauthorized) {
//     api.dispatch(logout());
//     window.location.reload();
//   }

//   return result;
// };

export const baseApi = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: ['Profile'],
});
