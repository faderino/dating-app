import React, { useEffect } from 'react';
import styled from 'styled-components';
import { PrimaryButton } from '../../components/Button';
import GiftBagItem from '../../components/GiftBagItem';
import { Content } from '../../components/Layout';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { useLazyCalcTotalCostQuery } from '../../services/gifts.service';
import { removeItem, selectGiftBag } from '../../store/giftBag/giftBagSlice';
import colors from '../../styles/colors';
import { formatCurrency } from '../../utils/format';

const PageContent = styled(Content)``;

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  width: 95%;
`;

const Header = styled.div`
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

const GiftBagData = styled.div`
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
    align-items: unset;
    justify-content: center;
  }
`;

const RecipientData = styled.div`
  gap: 2rem;
  width: 100%;
`;

const RecipientDataItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.25rem;
  border-bottom: 1px solid ${colors.text};
`;

const BillContainer = styled.div`
  width: 100%;
`;

const Bill = styled.div`
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
const BillData = styled.div<BillDataProps>`
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

const CheckoutButton = styled(PrimaryButton)`
  margin: 1rem 0;
  padding: 0.8rem;
`;

const GiftBagItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const GiftBag: React.FC = () => {
  const dispatch = useAppDispatch();
  const { recipient, items, totalItem, shippingCost, subTotal, totalCost } =
    useAppSelector(selectGiftBag);
  const [calcTotalCost] = useLazyCalcTotalCostQuery();

  useEffect(() => {
    if (totalItem > 0 && recipient) {
      const giftVouchers = items.map((item) => ({
        voucher_id: item.voucher_id,
        message: item.message,
      }));
      calcTotalCost({
        gift_vouchers: giftVouchers,
        recipient_id: recipient.profile_id,
      });
    }
  }, [totalItem]);

  return (
    <PageContent>
      <Header>
        <p>Details</p>
      </Header>
      <Container>
        <GiftBagData>
          <RecipientData>
            <RecipientDataItem>
              <p>To:</p>
              <p>{recipient?.name}</p>
            </RecipientDataItem>
            <RecipientDataItem>
              <p>Phone:</p>
              <p>+62 82125067385</p>
            </RecipientDataItem>
            <RecipientDataItem>
              <p>City:</p>
              <p>{recipient?.location.city}</p>
            </RecipientDataItem>
            <RecipientDataItem>
              <p>Province:</p>
              <p>{recipient?.location.province}</p>
            </RecipientDataItem>
            <RecipientDataItem>
              <p>Region:</p>
              <p>{recipient?.location.region}</p>
            </RecipientDataItem>
            <RecipientDataItem>
              <p>Country:</p>
              <p>{recipient?.location.country}</p>
            </RecipientDataItem>
          </RecipientData>
          <BillContainer>
            <Bill>
              <BillData color={colors.textSecondary}>
                <p>Sub Total</p>
                <p>IDR {formatCurrency(subTotal)}</p>
              </BillData>
              <BillData border="y" color={colors.textSecondary}>
                <p>Shipping Cost</p>
                <p>IDR {formatCurrency(shippingCost)}</p>
              </BillData>
              <BillData fw={700}>
                <p>TOTAL:</p>
                <p>IDR {formatCurrency(totalCost)}</p>
              </BillData>
            </Bill>
            <CheckoutButton block>CHECKOUT</CheckoutButton>
          </BillContainer>
        </GiftBagData>
      </Container>
      <Header>
        <p>Vouchers ({totalItem})</p>
      </Header>
      <Container>
        <GiftBagItemsContainer>
          {items.map((item, i) => (
            <GiftBagItem
              key={i}
              item={item}
              deleteItem={() => dispatch(removeItem(i))}
            />
          ))}
        </GiftBagItemsContainer>
      </Container>
    </PageContent>
  );
};

export default GiftBag;
