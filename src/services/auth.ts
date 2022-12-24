import { ResponseAPI } from '../types/api';
import { api } from '../services/api';

export type LoginRequest = {
  email: string;
  password: string;
};
type LoginResponse = ResponseAPI<{
  auth_token: string;
}>;

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
