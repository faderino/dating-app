import { ResponseAPI } from '../types/api';
import { api } from '../services/api';
import { LoggedInUser } from '../store/auth/authSlice';

export type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = ResponseAPI<{
  auth_token: string;
  user: LoggedInUser;
}>;

type GetUserResponse = ResponseAPI<LoggedInUser>;

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
    getUser: builder.query<GetUserResponse, void>({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUserQuery } = authApi;
