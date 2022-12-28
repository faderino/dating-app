import { ResponseAPI } from '../types/api';
import { baseApi } from './baseApi';

type LikeRequest = {
  liked_user_id: number;
};

type LikeResponseData = {
  likes_remaining: number;
  match: boolean;
  liked_user_name: string;
  liked_user_photo: string;
};

type LikeResponse = ResponseAPI<LikeResponseData>;

export const likesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    like: builder.mutation<LikeResponse, LikeRequest>({
      query: (body) => ({
        url: `/likes`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Recommendations'],
    }),
  }),
});

export const { useLikeMutation } = likesApi;
