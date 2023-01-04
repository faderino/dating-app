import { ResponseAPI } from '../types/api';
import { baseApi } from './baseApi';
import { City } from '../types/location';

type GetCitiesReponse = ResponseAPI<City[]>;

export const hobbiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCities: builder.query<City[], void>({
      query: () => ({
        url: '/cities',
        method: 'GET',
      }),
      transformResponse: (response: GetCitiesReponse) => response.data,
    }),
  }),
});

export const { useGetCitiesQuery } = hobbiesApi;
