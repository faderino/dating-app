import { ResponseAPI } from '../types/api';
import { baseApi } from './baseApi';
import { Photo } from '../types/profile';

export type AddPhotoRequest = {
  file: any;
  caption: string;
};

export type SetCaptionRequest = {
  photoId: number;
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
    setCaption: builder.mutation<ResponseAPI<null>, SetCaptionRequest>({
      query: ({ photoId, ...body }) => ({
        url: `/photos/${photoId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const {
  useAddPhotoMutation,
  useRemovePhotoMutation,
  useSetCaptionMutation,
} = photoApi;
