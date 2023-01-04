import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GiftBagButton from '../../components/GiftBagButton';
import GiftCard from '../../components/GiftCard';
import GiftItem from '../../components/GiftItem';
import { Content } from '../../components/Layout';
import MyGiftModal from '../../components/MyGiftModal/MyGiftModal';
import Pagination from '../../components/Pagination';
import useModal from '../../hooks/modal';
import {
  GiftVoucherType,
  useGetGiftsQuery,
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

const MyGiftsHeader = styled(Header)`
  margin-bottom: 2rem;
`;

const MyGiftsContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  padding-bottom: 2rem;
`;

const PaginationContainer = styled.div`
  width: 95%;
  max-width: 1024px;
  margin: 0 auto 1rem auto;
`;

const Gifts: React.FC = () => {
  const navigate = useNavigate();
  const { data: giftVouchers } = useGetGiftVouchersQuery();
  const [page, setPage] = useState(1);
  const { data: gifts } = useGetGiftsQuery(page);
  const { closeModal, openModal, showModal } = useModal();
  const [selectedGiftId, setSelectedGiftId] = useState<number>();

  const handleBuy = (voucher: GiftVoucherType) => {
    navigate('/app/gifts/buy', { state: { voucher } });
  };

  const handleClick = (giftId: number) => {
    setSelectedGiftId(giftId);
    openModal();
  };

  const changePage = (p: number) => {
    setPage(p);
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
        <MyGiftsHeader>
          <p>My Gifts</p>
        </MyGiftsHeader>
        <PaginationContainer>
          {gifts ? (
            <Pagination
              pageData={{
                page: gifts.page,
                count: gifts.count,
                size: gifts.size,
                total_pages: gifts.total_pages,
              }}
              changePage={changePage}
            />
          ) : null}
        </PaginationContainer>
        <MyGiftsContainer>
          {gifts?.data.map((gift) => (
            <GiftItem
              key={gift.gift_id}
              gift={gift}
              onClick={() => handleClick(gift.gift_id)}
            />
          ))}
        </MyGiftsContainer>
      </PageContent>
      <MyGiftModal
        show={showModal}
        closeModal={closeModal}
        giftId={selectedGiftId}
      />
    </>
  );
};

export default Gifts;
