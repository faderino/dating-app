import React from 'react';
import { MdArrowForward } from 'react-icons/md';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks/store';
import {
  ProfilePhoto,
  ProfilePhotoContainer,
} from '../../pages/Profile/Profile';
import { selectProfile } from '../../store/profile/profileSlice';
import colors from '../../styles/colors';
import { Gift } from '../../types/gift';
import { compactCurrency, getFirstName } from '../../utils/format';

const GiftItemContainer = styled.div`
  border-radius: 0.5rem;
  border: 1px solid ${colors.gray20};
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  :hover {
    box-shadow: 8px 10px 16px rgba(0, 0, 0, 0.05);
  }
`;

export const SenderRecipientPhotoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-right: 1px solid ${colors.gray20};
  padding-right: 0.5rem;
`;

export const SenderRecipientContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    color: ${colors.textSecondary};
  }
`;

export const SenderPhoto = styled(ProfilePhotoContainer)`
  width: 50px;
  height: 50px;
  margin: 0;
  &,
  ${ProfilePhoto} {
    border-width: 2px;
  }
`;

export const RecipientPhoto = styled(SenderPhoto)``;

const GiftDataContainer = styled.div`
  h3 {
    margin-top: 0.5rem;
  }
  p {
    color: ${colors.textSecondary};
  }
`;

export const Chip = styled.div`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${colors.gray10};
`;

type Props = {
  gift?: Gift;
  onClick: () => void;
};

const GiftItem: React.FC<Props> = ({ gift, onClick }) => {
  const profile = useAppSelector(selectProfile);
  const voucherTotal = gift?.gift_vouchers.reduce((total, curr) => {
    return (total += curr.voucher!.amount);
  }, 0);

  return (
    <GiftItemContainer onClick={onClick}>
      <SenderRecipientPhotoContainer>
        <SenderRecipientContainer>
          <SenderPhoto>
            <ProfilePhoto img={gift?.sender.photos[0]?.image_url} />
          </SenderPhoto>
          <p>
            {profile?.profile_id === gift?.sender_id
              ? 'You'
              : getFirstName(gift?.sender.name || '')}
          </p>
        </SenderRecipientContainer>
        <MdArrowForward color={colors.textSecondary} />
        <SenderRecipientContainer>
          <RecipientPhoto>
            <ProfilePhoto img={gift?.recipient.photos[0]?.image_url} />
          </RecipientPhoto>
          <p>
            {profile?.profile_id === gift?.recipient_id
              ? 'You'
              : getFirstName(gift?.recipient.name || '')}
          </p>
        </SenderRecipientContainer>
      </SenderRecipientPhotoContainer>
      <GiftDataContainer>
        <Chip>{gift?.status}</Chip>
        <h3>IDR {compactCurrency(voucherTotal || 0)}</h3>
        <p>{gift?.gift_vouchers.length}x Gift Cards</p>
      </GiftDataContainer>
    </GiftItemContainer>
  );
};

export default GiftItem;
