import { GiftVoucherItem } from '../store/giftBag/giftBagSlice';
import { ResponseAPI } from '../types/api';
import { Gift } from '../types/gift';
import { PaginationResponse } from '../types/pagination';
import { baseApi } from './baseApi';

export type GiftVoucherType = {
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

export type SendGiftRequest = CalcTotalCostRequest & {
  pay_amount: number;
};

export const giftsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGiftVouchers: builder.query<GiftVoucherType[], void>({
      query: () => ({
        url: '/vouchers',
        method: 'GET',
      }),
      transformResponse: (response: ResponseAPI<GiftVoucherType[]>) =>
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
    sendGift: builder.mutation<ResponseAPI<Gift>, SendGiftRequest>({
      query: (body) => ({
        url: '/gifts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Gifts'],
    }),
    getGifts: builder.query<PaginationResponse<Gift>, number>({
      query: (page) => ({
        url: `/gifts?page=${page}`,
        method: 'GET',
      }),
      providesTags: ['Gifts'],
      transformResponse: (response: ResponseAPI<PaginationResponse<Gift>>) =>
        response.data,
    }),
    getGift: builder.query<Gift, number>({
      query: (giftId: number) => ({
        url: `/gifts/${giftId}`,
        method: 'GET',
      }),
      transformResponse: (response: ResponseAPI<Gift>) => response.data,
    }),
  }),
});

export const {
  useGetGiftVouchersQuery,
  useLazyCalcTotalCostQuery,
  useSendGiftMutation,
  useGetGiftsQuery,
  useLazyGetGiftQuery,
} = giftsApi;
