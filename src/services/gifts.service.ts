import { GiftVoucherItem } from '../store/giftBag/giftBagSlice';
import { ResponseAPI } from '../types/api';
import { baseApi } from './baseApi';

export type GiftVoucher = {
  voucher_id: number;
  amount: 200000 | 300000 | 500000;
};

export type CalcTotalCostRequest = {
  recipient_id: number;
  gift_vouchers: Pick<GiftVoucherItem, 'voucher_id' | 'message'>[];
};

export type CalcTotalCostResponse = {
  voucher_cost: number;
  shipping_cost: number;
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
    calcTotalCost: builder.query<CalcTotalCostResponse, CalcTotalCostRequest>({
      query: (body) => ({
        url: '/gifts/total-cost',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ResponseAPI<CalcTotalCostResponse>) =>
        response.data,
    }),
  }),
});

export const { useGetGiftVouchersQuery, useLazyCalcTotalCostQuery } = giftsApi;
