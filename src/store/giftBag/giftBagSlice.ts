import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { giftsApi, GiftVoucher } from '../../services/gifts.service';
import { Profile } from '../../types/profile';

export type GiftVoucherItem = GiftVoucher & {
  message: string;
};

type AddItemPayload = {
  giftVoucherItem: GiftVoucherItem;
  recipient: Profile;
};

interface GiftBagState {
  totalItem: number;
  items: GiftVoucherItem[];
  recipient: Profile | null;
  subTotal: number;
  shippingCost: number;
  totalCost: number;
}

const initialState: GiftBagState = {
  totalItem: 0,
  items: [],
  recipient: null,
  subTotal: 0,
  shippingCost: 0,
  totalCost: 0,
};

const giftBagSlice = createSlice({
  name: 'giftBag',
  initialState,
  reducers: {
    emptyBag: () => initialState,
    addItem: (state, action: PayloadAction<AddItemPayload>) => {
      if (
        state.recipient !== null &&
        state.recipient.profile_id !== action.payload.recipient.profile_id
      ) {
        state.recipient = action.payload.recipient;
        state.items = [action.payload.giftVoucherItem];
        state.totalItem = 1;
      } else {
        state.recipient = action.payload.recipient;
        state.items.push(action.payload.giftVoucherItem);
        state.totalItem++;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((_, i) => i !== action.payload);
      if (state.totalItem === 1) {
        state.recipient = null;
        state.subTotal = 0;
        state.shippingCost = 0;
        state.totalCost = 0;
      }
      state.totalItem--;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      giftsApi.endpoints.calcTotalCost.matchFulfilled,
      (state, action) => {
        state.subTotal = action.payload.voucher_cost;
        state.shippingCost = action.payload.shipping_cost;
        state.totalCost = action.payload.voucher_cost;
        +action.payload.shipping_cost;
      },
    );
  },
});

export const { emptyBag, addItem, removeItem } = giftBagSlice.actions;

export const selectGiftBag = (state: RootState): GiftBagState => state.giftBag;
export const selectGiftBagTotalItem = (
  state: RootState,
): GiftBagState['totalItem'] => state.giftBag.totalItem;
export const selectGiftRecipient = (
  state: RootState,
): GiftBagState['recipient'] => state.giftBag.recipient;

export default giftBagSlice.reducer;
