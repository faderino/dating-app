import { ResponseAPI } from '../types/api';
import { api } from '../services/api';
import { LoggedInUser } from '../store/auth/authSlice';
import { Photo } from '../types/profile';
import { Hobby } from './hobbies';

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
  user_id: number;
  email: string;
  role_id: number;
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
