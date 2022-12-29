import { ResponseAPI } from '../types/api';
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

export type LikeResponse = ResponseAPI<LikeResponseData>;

export const likesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    like: builder.mutation<LikeResponse, LikeRequest>({
      query: (body) => ({
        url: `/likes`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLikeMutation } = likesApi;
