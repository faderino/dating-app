import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GiftBagButton from '../../components/GiftBagButton';
import GiftCard from '../../components/GiftCard';
import { Content } from '../../components/Layout';
import {
  GiftVoucherType,
  useGetGiftVouchersQuery,
} from '../../services/gifts.service';
import colors from '../../styles/colors';

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

const GiftCardsHeader = styled(Header)`
  & > div {
    max-width: 1024px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      margin: 0;
    }
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
  const navigate = useNavigate();

  const handleBuy = (voucher: GiftVoucherType) => {
    navigate('/app/gifts/buy', { state: { voucher } });
  };

  return (
    <>
      <PageContent>
        <GiftCardsHeader>
          <div>
            <p>Gift Cards</p>
            <GiftBagButton></GiftBagButton>
          </div>
        </GiftCardsHeader>
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
    </>
  );
};

export default Gifts;
