import React from 'react';
import { GiftVoucherType } from '../../services/gifts.service';
import colors from '../../styles/colors';
import { compactCurrency } from '../../utils/format';
import { Logo } from '../Logo';
import {
  BuyButton,
  GiftCardContainer,
  GiftCardContent,
  GiftCardFooter,
} from './style';

type Props = {
  voucher?: GiftVoucherType;
  onBuy: () => void;
};

const GiftCard: React.FC<Props> = ({ voucher, onBuy }) => {
  return (
    <GiftCardContainer>
      <GiftCardContent amount={voucher?.amount}>
        <Logo disabled color={colors.white} size={1.5} />
      </GiftCardContent>
      <GiftCardFooter>
        <div>
          <p>Gift Card</p>
          <h3>IDR {compactCurrency(voucher?.amount || 0)}</h3>
        </div>
        <BuyButton onClick={onBuy}>BUY</BuyButton>
      </GiftCardFooter>
    </GiftCardContainer>
  );
};

export default GiftCard;
