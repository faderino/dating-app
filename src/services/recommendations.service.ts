import { ResponseAPI } from '../types/api';
import { baseApi } from './baseApi';
import { Profile } from '../types/profile';
import { PaginationResponse } from '../types/pagination';

type GetRecsResponse = ResponseAPI<PaginationResponse<Profile>>;

export const recommendationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecommendations: builder.query<
      PaginationResponse<Profile>,
      number | void
    >({
      query: (page = 1) => ({
        url: `/recommendations?page=${page}`,
        method: 'GET',
      }),
      transformResponse: (response: GetRecsResponse) => response.data,
      providesTags: ['Recommendations'],
    }),
  }),
});

export const { useGetRecommendationsQuery } = recommendationsApi;
