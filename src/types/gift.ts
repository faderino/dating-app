export interface Gift {
  gift_id: number;
  sender_id: number;
  recipient_id: number;
  gift_vouchers: GiftVoucher[];
  shipping_cost: number;
  status: string;
}

export interface GiftVoucher {
  gift_voucher_id: number;
  gift_id: number;
  voucher_id: number;
  message: string;
}
