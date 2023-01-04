import styled from 'styled-components';
import { GiftVoucherType } from '../../services/gifts.service';
import colors from '../../styles/colors';
import { Button, ButtonOverlay } from '../Button';

export const GiftCardContainer = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 8px 10px 16px rgba(0, 0, 0, 0.03);
  transition: transform 0.3s ease;
  user-select: none;
  :hover {
    transform: translateY(-0.2rem);
    box-shadow: 8px 10px 16px rgba(0, 0, 0, 0.05);
  }
`;

export const GiftCardContent = styled.div<{
  amount?: GiftVoucherType['amount'];
}>`
  background-color: ${(props) =>
    props.amount === 500000 ? colors.gold : colors.gray40};
  background-image: ${(props) =>
    props.amount === 300000 ? colors.gradient : undefined};
  padding: 4rem;
`;

export const GiftCardFooter = styled.div`
  background-color: ${colors.white};
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BuyButton = styled(Button)`
  border-radius: 0.25rem;
  background-color: ${colors.gold};
  ${ButtonOverlay} {
    display: none;
  }
`;
