import { ResponseAPI } from '../types/api';
import { City } from '../types/location';
import { PaginationResponse } from '../types/pagination';
import { baseApi } from './baseApi';
import { VenueDiscountVoucher } from './meetup.service';

type Venue = {
  venue_id: number;
  name: string;
  address: string;
  city_id: number;
  city: City;
  available: boolean;
  venue_vouchers: VenueDiscountVoucher[];
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
  }),
});

export const { useGetAllVenuesQuery } = venueApi;
