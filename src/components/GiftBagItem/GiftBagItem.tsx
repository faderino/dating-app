import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks/store';
import { GiftVoucherType } from '../../services/gifts.service';
import {
  GiftVoucherItem,
  selectGiftRecipient,
} from '../../store/giftBag/giftBagSlice';
import colors from '../../styles/colors';
import PreviewGiftCard from '../GiftCard/PreviewGiftCard';

const GiftBagItemContainer = styled.div`
  position: relative;
`;

const RemoveButton = styled.div`
  display: flex;
  position: absolute;
  top: -0.4rem;
  right: -0.4rem;
  border-radius: 50%;
  background-color: ${colors.white};
  cursor: pointer;
  z-index: 1;
`;

type Props = {
  item: GiftVoucherItem;
  deleteItem: () => void;
};

const GiftBagItem: React.FC<Props> = ({ item, deleteItem }) => {
  const recipient = useAppSelector(selectGiftRecipient);
  const voucher: GiftVoucherType = {
    amount: item.amount,
    voucher_id: item.voucher_id,
  };
  return (
    <GiftBagItemContainer>
      {/* <GiftCard voucher={voucher} onBuy={() => {}} /> */}
      <RemoveButton onClick={deleteItem}>
        <FaTimesCircle color={colors.red50} size={24} />
      </RemoveButton>
      <PreviewGiftCard
        voucher={voucher}
        message={item.message}
        recipient={recipient ?? undefined}
        onBuy={() => {}}
      />
    </GiftBagItemContainer>
  );
};

export default GiftBagItem;
