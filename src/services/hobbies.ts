import { ResponseAPI } from '../types/api';
import { api } from '../services/api';

export interface Hobby {
  hobby_id: number;
  title: string;
}

type GetHobbiesReponse = ResponseAPI<Hobby[]>;

export const hobbiesApi = api.injectEndpoints({
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
