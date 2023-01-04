import React from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks/store';
import { selectGiftBagTotalItem } from '../../store/giftBag/giftBagSlice';
import colors from '../../styles/colors';

const StyledGiftBagButton = styled.button`
  position: relative;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${colors.gray10};
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  p {
    display: none;
  }
  @media screen and (min-width: 896px) {
    p {
      display: block;
      font-size: 0.9rem;
      font-weight: 700;
    }
  }
  :hover {
    background-color: ${colors.gray20};
  }
`;

const ItemCount = styled.div`
  font-weight: 600;
`;

const GiftBagButton: React.FC = () => {
  const navigate = useNavigate();
  const giftBagTotalItem = useAppSelector(selectGiftBagTotalItem);

  return (
    <StyledGiftBagButton onClick={() => navigate('bag')}>
      <FaShoppingBag size={24} />
      <p>GIFT BAG</p>
      {giftBagTotalItem > 0 ? (
        <ItemCount>({giftBagTotalItem})</ItemCount>
      ) : null}
    </StyledGiftBagButton>
  );
};

export default GiftBagButton;
