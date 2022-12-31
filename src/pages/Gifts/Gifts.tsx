import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GiftCard from '../../components/GiftCard';
import { Content } from '../../components/Layout';
import useModal from '../../hooks/modal';
import {
  GiftVoucher,
  useGetGiftVouchersQuery,
} from '../../services/gifts.service';
import colors from '../../styles/colors';
import BuyGiftModal from './BuyGiftModal';

const PageContent = styled(Content)``;

const Header = styled.div`
  border-bottom: 1px solid ${colors.gray20};
  padding: 1rem;
  font-weight: 700;
  font-size: 1.2rem;
  p {
    max-width: 1024px;
    margin: auto;
  }
`;

const Container = styled.div`
  width: 95%;
  max-width: 1024px;
  margin: auto;
`;

const GiftCardsContainer = styled(Container)`
  display: flex;
  align-items: center;
  overflow-x: auto;
  padding: 2rem 0;
  gap: 2rem;
  & > div {
    min-width: 225px;
  }
`;

const Gifts: React.FC = () => {
  const { data: giftVouchers } = useGetGiftVouchersQuery();
  const { closeModal, openModal, showModal } = useModal();
  const [selectedGiftVoucher, setSelectedGiftVoucher] = useState<GiftVoucher>();
  const navigate = useNavigate();

  const handleBuy = (voucher: GiftVoucher) => {
    setSelectedGiftVoucher(voucher);
    openModal();
    navigate('/app/gifts/buy', { state: { voucher } });
  };

  return (
    <>
      <PageContent>
        <Header>
          <p>Gift Cards</p>
        </Header>
        <GiftCardsContainer>
          {giftVouchers?.map((voucher) => (
            <GiftCard
              key={voucher.voucher_id}
              voucher={voucher}
              onBuy={() => handleBuy(voucher)}
            />
          ))}
        </GiftCardsContainer>
        <Header>
          <p>My Gifts</p>
        </Header>
      </PageContent>
      <BuyGiftModal
        show={showModal}
        closeModal={closeModal}
        selectedGiftVoucher={selectedGiftVoucher}
      />
    </>
  );
};

export default Gifts;
