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

export type GoldProfileType = {
  gold_profile_type_id: number;
  duration: 1 | 3 | 7;
  price: 5000 | 10000 | 17500;
};

export type SubscribeGoldProfileResponse = ResponseAPI<{
  paid_amount: number;
  expirty_date: Date;
}>;

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
      invalidatesTags: ['Profile'],
    }),
    getGoldProfileTypes: builder.query<GoldProfileType[], void>({
      query: () => ({
        url: '/gold-profile-types',
        method: 'GET',
      }),
      transformResponse: (response: ResponseAPI<GoldProfileType[]>) =>
        response.data,
    }),
    subscribeGold: builder.mutation<SubscribeGoldProfileResponse, number>({
      query: (id) => ({
        url: `/profiles/subscribe/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useEditProfileMutation,
  useGetGoldProfileTypesQuery,
  useSubscribeGoldMutation,
} = profileApi;
