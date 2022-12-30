import { ResponseAPI } from '../types/api';
import { PaginationResponse } from '../types/pagination';
import { Profile } from '../types/profile';
import { baseApi } from './baseApi';

type LikeRequest = {
  liked_user_id: number;
};

export type LikeResponseData = {
  likes_remaining: number;
  match: boolean;
  liked_user_name: string;
  liked_user_photo: string;
};

export type Match = {
  like_id: number;
  user_id: number;
  liked_user_id: number;
  liked_user: Profile;
};

export type LikeResponse = ResponseAPI<LikeResponseData>;
type MatchesResponse = ResponseAPI<PaginationResponse<Match>>;

export const likesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    like: builder.mutation<LikeResponse, LikeRequest>({
      query: (body) => ({
        url: '/likes',
        method: 'POST',
        body,
      }),
    }),
    getMatches: builder.query<PaginationResponse<Match>, void>({
      query: () => ({
        url: '/matches',
        method: 'GET',
      }),
      transformResponse: (response: MatchesResponse) => response.data,
    }),
  }),
});

export const { useLikeMutation, useGetMatchesQuery } = likesApi;
