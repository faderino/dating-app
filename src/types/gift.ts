import { GiftVoucherType } from '../services/gifts.service';
import { Profile } from './profile';

export interface Gift {
  gift_id: number;
  sender_id: number;
  sender: Profile;
  recipient_id: number;
  recipient: Profile;
  gift_vouchers: GiftVoucher[];
  shipping_cost: number;
  status:
    | 'Processed'
    | 'Waiting for Courier'
    | 'At Courier Pick-up'
    | 'On the way'
    | 'Accepted';
}

export interface GiftVoucher {
  gift_voucher_id: number;
  gift_id: number;
  voucher_id: number;
  voucher?: GiftVoucherType;
  message: string;
}

export enum GiftStatus {
  Processed = 'Processed',
  WaitingForCourier = 'Waiting for Courier',
  AtCourierPickup = 'At Courier Pick-up',
  OnTheWay = 'On the way',
  Accepted = 'Accepted',
}
