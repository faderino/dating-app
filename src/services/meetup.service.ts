import { ResponseAPI } from '../types/api';
import { Location } from '../types/location';
import { PaginationResponse } from '../types/pagination';
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
  first_party_user_id: number;
  second_party_user_id: number;
  date_time: Date;
  approved: boolean;
  claimed_voucher_id: number | null;
};

type ScheduleMeetUpResponse = ResponseAPI<Schedule>;

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
    }),
  }),
});

export const {
  useGetVenueListQuery,
  useLazyGetVenueListQuery,
  useSetMeetUpScheduleMutation,
} = meetUpApi;
