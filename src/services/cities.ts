import { ResponseAPI } from '../types/api';
import { api } from '../services/api';
import { City } from '../types/location';

type GetCitiesReponse = ResponseAPI<City[]>;

export const hobbiesApi = api.injectEndpoints({
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
