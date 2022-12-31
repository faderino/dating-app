import { ResponseAPI } from '../types/api';
import { baseApi } from './baseApi';

export type GiftVoucher = {
  voucher_id: number;
  amount: 200000 | 300000 | 500000;
};

export const giftsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGiftVouchers: builder.query<GiftVoucher[], void>({
      query: () => ({
        url: '/vouchers',
        method: 'GET',
      }),
      transformResponse: (response: ResponseAPI<GiftVoucher[]>) =>
        response.data,
    }),
  }),
});

export const { useGetGiftVouchersQuery } = giftsApi;
