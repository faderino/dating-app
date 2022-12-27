import { ResponseAPI } from '../types/api';
import { baseApi } from '../services/api';
import { Profile } from '../types/profile';
import { IRole } from '../types/user';

type GetProfileResponseData = {
  user_id: number;
  email: string;
  role: IRole;
  profile: Profile;
};

type GetProfileResponse = ResponseAPI<GetProfileResponseData>;

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
  }),
});

export const { useGetProfileQuery } = profileApi;
