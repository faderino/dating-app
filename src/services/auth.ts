import { ResponseAPI } from '../types/api';
import { baseApi } from '../services/api';
import { LoggedInUser } from '../store/auth/authSlice';
import { Hobby, Photo } from '../types/profile';

export type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = ResponseAPI<{
  auth_token: string;
  user: LoggedInUser;
}>;

type GetUserResponse = ResponseAPI<LoggedInUser>;

type RegisterResponse = {
  auth_token: string;
  user_id: number;
  email: string;
  role_id: number;
  role: string;
  name: string;
  gender: number;
  birthdate: Date;
  city_id: number;
  photos: Photo[];
  hobbies: Hobby[];
  height: number;
  weight: number;
  bio: string;
};

export type RegisterRequest = FormData;

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
    getUser: builder.query<LoggedInUser, void>({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
      transformResponse: (response: GetUserResponse) => response.data,
    }),
    register: builder.mutation<ResponseAPI<RegisterResponse>, RegisterRequest>({
      query: (body) => ({
        url: '/register',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUserQuery, useRegisterMutation } =
  authApi;
