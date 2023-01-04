import React, { useEffect } from 'react';
import { MdArrowForward } from 'react-icons/md';
import styled from 'styled-components';
import Modal, { CloseModalBtn, ModalProps } from '../../components/Modal/Modal';
import { useAppSelector } from '../../hooks/store';
import { GiftBagItemsContainer } from '../../pages/GiftBag/style';
import { ProfilePhoto } from '../../pages/Profile/Profile';
import { useLazyGetGiftQuery } from '../../services/gifts.service';
import { GiftVoucherItem } from '../../store/giftBag/giftBagSlice';
import { selectProfile } from '../../store/profile/profileSlice';
import colors from '../../styles/colors';
import { getFirstName } from '../../utils/format';
import GiftBagItem from '../GiftBagItem';
import { RemoveButton } from '../GiftBagItem/GiftBagItem';
import {
  Chip,
  RecipientPhoto,
  SenderPhoto,
  SenderRecipientContainer,
  SenderRecipientPhotoContainer,
} from '../GiftItem/GiftItem';

const StyledModal = styled(Modal)`
  ${CloseModalBtn} {
    display: none;
  }
`;

const DoneButton = styled.button`
  border: none;
  color: ${colors.primary};
  position: absolute;
  right: 0.5rem;
  top: 1.25rem;
  padding: 1rem;
  font-weight: 600;
  cursor: pointer;
`;

const Header = styled.div`
  border-bottom: 1px solid ${colors.gray20};
  padding: 1rem;
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  p {
    max-width: 1024px;
    margin: auto;
  }
`;

const GiftHeader = styled(SenderRecipientPhotoContainer)`
  justify-content: center;
  margin-bottom: 1rem;
  border: none;
  ${SenderPhoto} {
    width: 75px;
    height: 75px;
  }
`;

const MyGiftVoucherContainer = styled(GiftBagItemsContainer)`
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  padding-bottom: 2rem;
`;

const MyGiftVoucher = styled(GiftBagItem)`
  ${RemoveButton} {
    display: none;
  }
`;

const GiftStatusContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const GiftStatus = styled(Chip)`
  font-size: 1rem;
`;

type Props = ModalProps & {
  giftId?: number;
};

const MyGiftModal: React.FC<Props> = ({ show, closeModal, giftId }) => {
  const profile = useAppSelector(selectProfile);
  const [getGift, { data: gift }] = useLazyGetGiftQuery();

  useEffect(() => {
    if (giftId) getGift(giftId);
  }, [giftId]);

  return (
    <StyledModal show={show} closeModal={closeModal}>
      <DoneButton onClick={closeModal}>DONE</DoneButton>
      <Header>
        <p>Gift</p>
      </Header>
      <GiftHeader>
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
      </GiftHeader>
      <GiftStatusContainer>
        <GiftStatus>{gift?.status}</GiftStatus>
      </GiftStatusContainer>
      <MyGiftVoucherContainer>
        {gift?.gift_vouchers.map((item) => {
          const voucher: GiftVoucherItem = {
            voucher_id: item.voucher_id,
            amount: item.voucher!.amount,
            message: item.message,
          };
          return (
            <MyGiftVoucher
              key={item.gift_voucher_id}
              item={voucher}
              recipient={gift.recipient}
              deleteItem={() => {}}
            />
          );
        })}
      </MyGiftVoucherContainer>
    </StyledModal>
  );
};

export default MyGiftModal;
