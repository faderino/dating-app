import { ResponseAPI } from '../types/api';
import { baseApi } from './baseApi';
import { Photo } from '../types/profile';

export type AddPhotoRequest = {
  file: any;
  caption: string;
};

export const photoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addPhoto: builder.mutation<ResponseAPI<Photo>, FormData>({
      query: (body) => ({
        url: '/photos',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Profile'],
    }),
    removePhoto: builder.mutation<ResponseAPI<null>, number>({
      query: (photoId) => ({
        url: `/photos/${photoId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const { useAddPhotoMutation, useRemovePhotoMutation } = photoApi;
