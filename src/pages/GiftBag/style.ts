import styled from 'styled-components';
import { PrimaryButton } from '../../components/Button';
import { Content } from '../../components/Layout';
import colors from '../../styles/colors';

export const PageContent = styled(Content)``;

export const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  width: 95%;
`;

export const Header = styled.div`
  border-bottom: 1px solid ${colors.gray20};
  margin-bottom: 1rem;
  padding: 1rem;
  font-weight: 700;
  font-size: 1.2rem;
  p {
    max-width: 1024px;
    margin: auto;
  }
`;

export const GiftBagData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  & > div {
    flex-basis: 50%;
  }
  @media screen and (min-width: 480px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;

export const RecipientData = styled.div`
  gap: 2rem;
  width: 100%;
`;

export const RecipientDataItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.25rem;
  border-bottom: 1px solid ${colors.text};
`;

export const BillContainer = styled.div`
  width: 100%;
`;

export const Bill = styled.div`
  width: 100%;
  background-color: ${colors.gray10};
  border-radius: 0.5rem;
  border: 1px solid ${colors.gray30};
`;

type BillDataProps = {
  border?: 'top' | 'bottom' | 'y';
  color?: string;
  fw?: number;
};
export const BillData = styled.div<BillDataProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border-top: ${({ border }) =>
    border === 'y' || border === 'top' ? `1px solid ${colors.gray30}` : null};
  border-bottom: ${({ border }) =>
    border === 'y' || border === 'bottom'
      ? `1px solid ${colors.gray30}`
      : null};
  color: ${({ color }) => (color ? color : colors.text)};
  font-weight: ${({ fw }) => (fw ? fw : 400)};
`;

export const CheckoutButton = styled(PrimaryButton)`
  margin: 1rem 0;
  padding: 0.8rem;
`;

export const GiftBagItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;
