import { ResponseAPI } from '../types/api';
import { City, Location } from '../types/location';
import { PaginationResponse } from '../types/pagination';
import { Profile } from '../types/profile';
import { baseApi } from './baseApi';

export type Venue = {
  venue_id: number;
  name: string;
  address: string;
  city_id: number;
  location: Location;
  available: boolean;
};

export type ScheduleMeetUpRequest = {
  venue_id: number;
  second_party_user_id: number;
  date_time: string;
};

export type Schedule = {
  schedule_id: number;
  venue_id: number;
  venue: (Omit<Venue, 'location'> & { city: City }) | null;
  first_party_user_id: number;
  first_party_user: Profile | null;
  second_party_user_id: number;
  second_party_user: Profile | null;
  date_time: Date;
  approved: boolean;
  claimed_voucher_id: number | null;
};

type ScheduleMeetUpResponse = ResponseAPI<Schedule>;

type GetSchedulesResponseData = PaginationResponse<Schedule>;

export const meetUpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVenueList: builder.query<PaginationResponse<Venue>, number>({
      query: (matchId) => ({
        url: `/meetup-venues/${matchId}`,
        method: 'GET',
      }),
      transformResponse: (response: ResponseAPI<PaginationResponse<Venue>>) =>
        response.data,
    }),
    setMeetUpSchedule: builder.mutation<
      ScheduleMeetUpResponse,
      ScheduleMeetUpRequest
    >({
      query: (body) => ({
        url: '/meetup-schedules',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Schedules'],
    }),
    getSchedules: builder.query<GetSchedulesResponseData, string | void>({
      query: (query) => ({
        url: `/meetup-schedules?${query}`,
        method: 'GET',
      }),
      transformResponse: (response: ResponseAPI<GetSchedulesResponseData>) =>
        response.data,
      providesTags: ['Schedules'],
    }),
    getMeetUpInvitations: builder.query<GetSchedulesResponseData, void>({
      query: () => ({
        url: '/meetup-schedules/invitations',
        method: 'GET',
      }),
      transformResponse: (response: ResponseAPI<GetSchedulesResponseData>) =>
        response.data,
      providesTags: ['Schedules'],
    }),
    acceptInvititation: builder.mutation<ResponseAPI<Schedule>, number>({
      query: (scheduleId) => ({
        url: `/meetup-schedules/${scheduleId}/approve`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Schedules'],
    }),
  }),
});

export const {
  useGetVenueListQuery,
  useLazyGetVenueListQuery,
  useSetMeetUpScheduleMutation,
  useGetSchedulesQuery,
  useGetMeetUpInvitationsQuery,
  useAcceptInvititationMutation,
} = meetUpApi;
