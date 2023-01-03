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
  venue:
    | (Omit<Venue, 'location'> & {
        city: City;
        venue_vouchers: VenueDiscountVoucher[];
      })
    | null;
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

export type VenueDiscountVoucher = {
  venue_voucher_id: number;
  venue_id: number;
  discount_amount: number;
  quota: number;
};

export type RescheduleMeetUpRequest = {
  scheduleId: number;
  venue_id: number;
  date_time: string;
};

export type ClaimVenueDiscountRequest = {
  scheduleId: number;
  venue_voucher_id: number;
};

export const meetUpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVenueList: builder.query<
      PaginationResponse<Venue>,
      { matchId: number; page: number }
    >({
      query: ({ matchId, page }) => ({
        url: `/meetup-venues/${matchId}?page=${page}`,
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
    getMeetUpInvitations: builder.query<GetSchedulesResponseData, number>({
      query: (page) => ({
        url: `/meetup-schedules/invitations?page=${page}`,
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
    rescheduleMeetUp: builder.mutation<
      ResponseAPI<Schedule>,
      RescheduleMeetUpRequest
    >({
      query: ({ scheduleId, ...body }) => ({
        url: `/meetup-schedules/${scheduleId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Schedules'],
    }),
    getVenueDiscounts: builder.query<
      VenueDiscountVoucher[],
      number | undefined
    >({
      query: (venueId) => ({
        url: `/venues/${venueId}/vouchers`,
        method: 'GET',
      }),
      transformResponse: (response: ResponseAPI<VenueDiscountVoucher[]>) =>
        response.data,
      providesTags: ['Discounts'],
    }),
    claimVenueDiscount: builder.mutation<
      ResponseAPI<Schedule>,
      ClaimVenueDiscountRequest
    >({
      query: ({ scheduleId, ...body }) => ({
        url: `/meetup-schedules/${scheduleId}/claim-discount`,
        method: 'PATCH',
        body,
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
  useRescheduleMeetUpMutation,
  useGetVenueDiscountsQuery,
  useLazyGetVenueDiscountsQuery,
  useClaimVenueDiscountMutation,
} = meetUpApi;
