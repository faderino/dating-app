import { ResponseAPI } from '../types/api';
import { baseApi } from './baseApi';
import { Profile } from '../types/profile';
import { IRole } from '../types/user';

type GetProfileResponseData = {
  user_id: number;
  email: string;
  role: IRole;
  profile: Profile;
};

type GetProfileResponse = ResponseAPI<GetProfileResponseData>;

export type EditProfileRequest = {
  name: string;
  city_id: number;
  height: number;
  weight: number;
  hobbies: number[];
  bio: string;
};

export type EditProfileResponse = Omit<Profile, 'location'>;

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<GetProfileResponseData, void>({
      query: () => ({
        url: '/profiles',
        method: 'GET',
      }),
      transformResponse: (response: GetProfileResponse) => response.data,
      providesTags: ['Profile'],
    }),
    editProfile: builder.mutation<
      ResponseAPI<EditProfileResponse>,
      EditProfileRequest
    >({
      query: (body) => ({
        url: '/profiles',
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const { useGetProfileQuery, useEditProfileMutation } = profileApi;
