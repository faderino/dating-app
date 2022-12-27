import { ResponseAPI } from '../types/api';
import { api } from '../services/api';
import { Hobby } from '../types/profile';

type GetHobbiesReponse = ResponseAPI<Hobby[]>;

export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<GetHobbiesReponse, void>({
      query: () => ({
        url: '/hobbies',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
