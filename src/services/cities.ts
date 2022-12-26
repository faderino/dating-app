import { ResponseAPI } from '../types/api';
import { api } from '../services/api';

export interface City {
  city_id: number;
  name: string;
}

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
