import React from 'react';
import styled from 'styled-components';
import { GiftVoucher } from '../../services/gifts.service';
import colors from '../../styles/colors';
import { Profile } from '../../types/profile';
import { compactCurrency } from '../../utils/format';
import { Logo } from '../Logo';
import { GiftCardContainer, GiftCardContent, GiftCardFooter } from './style';

const PreviewGiftCardContainer = styled(GiftCardContainer)`
  max-width: 400px;
  margin: 0 auto;
  :hover {
    transform: none;
  }
`;

const PreviewCardContent = styled(GiftCardContent)`
  position: relative;
  padding: 0;
  width: 100%;
  aspect-ratio: 1.75;
  a {
    position: absolute;
    right: 0;
    padding: 0.5rem;
  }
`;

const GiftCardAmount = styled.h3`
  position: absolute;
  top: 0;
  padding: 0.5rem;
  background-color: ${colors.white};
  border-bottom-right-radius: 0.5rem;
`;

const GiftCardRecipient = styled.div`
  position: absolute;
  bottom: 0.5rem;
  padding: 0.5rem 1rem;
  color: ${colors.white};
  p {
    font-weight: 500;
  }
`;

const PreviewFooter = styled(GiftCardFooter)`
  flex-direction: column;
  padding: 1rem;
`;

const Message = styled.div`
  text-align: center;
`;

type Props = {
  voucher?: GiftVoucher;
  onBuy: () => void;
  message: string;
  recipient?: Profile;
};

const PreviewGiftCard: React.FC<Props> = ({ voucher, message, recipient }) => {
  return (
    <PreviewGiftCardContainer>
      <PreviewCardContent amount={voucher?.amount}>
        <Logo disabled color={colors.white} size={1.5} />
        <GiftCardAmount>
          IDR {compactCurrency(voucher?.amount || 0)}
        </GiftCardAmount>
        <GiftCardRecipient>
          <p>to:</p>
          <h1>{recipient?.name}</h1>
        </GiftCardRecipient>
      </PreviewCardContent>
      <PreviewFooter>
        <Message>{message}</Message>
      </PreviewFooter>
    </PreviewGiftCardContainer>
  );
};

export default PreviewGiftCard;
