import { ResponseAPI } from '../types/api';
import { baseApi } from './baseApi';
import { Hobby } from '../types/profile';

type GetHobbiesReponse = ResponseAPI<Hobby[]>;

export const hobbiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHobbies: builder.query<GetHobbiesReponse, void>({
      query: () => ({
        url: '/hobbies',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetHobbiesQuery } = hobbiesApi;
