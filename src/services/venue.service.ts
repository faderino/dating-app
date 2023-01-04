import { ResponseAPI } from '../types/api';
import { City } from '../types/location';
import { PaginationResponse } from '../types/pagination';
import { baseApi } from './baseApi';
import { VenueDiscountVoucher } from './meetup.service';

export type Venue = {
  venue_id: number;
  name: string;
  address: string;
  city_id: number;
  city: City;
  available: boolean;
  venue_vouchers: VenueDiscountVoucher[];
};

export type UpdateVenueRequest = {
  venueId: number;
  name: string;
  address: string;
  city_id: number;
  available: boolean;
};

export type UpdateVenueVoucherRequest = {
  venueVoucherId: number;
  discount_amount: number;
  quota: number;
};

export const venueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVenues: builder.query<PaginationResponse<Venue>, string>({
      query: (params) => ({
        url: `/venues?${params}`,
        method: 'GET',
      }),
      transformResponse: (response: ResponseAPI<PaginationResponse<Venue>>) =>
        response.data,
      providesTags: ['Venues'],
    }),
    updateVenue: builder.mutation<
      ResponseAPI<Omit<Venue, 'venue_vouchers'>>,
      UpdateVenueRequest
    >({
      query: ({ venueId, ...body }) => ({
        url: `/venues/${venueId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Venues'],
    }),
    getVenueVouchers: builder.query<VenueDiscountVoucher[], number>({
      query: (venueId) => ({
        url: `/venue-vouchers/${venueId}`,
        method: 'GET',
      }),
      transformResponse: (response: ResponseAPI<VenueDiscountVoucher[]>) =>
        response.data,
      providesTags: ['VenueVouchers'],
    }),
    updateVenueVoucher: builder.mutation<
      ResponseAPI<VenueDiscountVoucher>,
      UpdateVenueVoucherRequest
    >({
      query: ({ venueVoucherId, ...body }) => ({
        url: `/venue-vouchers/${venueVoucherId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['VenueVouchers'],
    }),
  }),
});

export const {
  useGetAllVenuesQuery,
  useUpdateVenueMutation,
  useGetVenueVouchersQuery,
  useUpdateVenueVoucherMutation,
} = venueApi;
