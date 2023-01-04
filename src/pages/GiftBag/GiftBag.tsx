import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CheckoutModal from '../../components/CheckoutModal';
import GiftBagItem from '../../components/GiftBagItem';
import useModal from '../../hooks/modal';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import {
  useLazyCalcTotalCostQuery,
  useSendGiftMutation,
} from '../../services/gifts.service';
import {
  emptyBag,
  removeItem,
  selectGiftBag,
} from '../../store/giftBag/giftBagSlice';
import colors from '../../styles/colors';
import { formatCurrency } from '../../utils/format';
import GiftBagDetail from './GiftBagDetail';
import {
  Bill,
  BillContainer,
  BillData,
  CheckoutButton,
  Container,
  GiftBagData,
  GiftBagItemsContainer,
  Header,
  PageContent,
} from './style';

const GiftBag: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { recipient, items, totalItem, shippingCost, subTotal, totalCost } =
    useAppSelector(selectGiftBag);
  const [calcTotalCost] = useLazyCalcTotalCostQuery();
  const [sendGift, { isLoading }] = useSendGiftMutation();
  const { closeModal, openModal, showModal } = useModal();

  const giftVouchers = items.map((item) => ({
    voucher_id: item.voucher_id,
    message: item.message,
  }));

  useEffect(() => {
    if (totalItem > 0 && recipient) {
      calcTotalCost({
        gift_vouchers: giftVouchers,
        recipient_id: recipient.profile_id,
      });
    }
  }, [totalItem]);

  const onCheckout = async (payAmount: number) => {
    try {
      await sendGift({
        pay_amount: payAmount,
        recipient_id: recipient!.profile_id,
        gift_vouchers: giftVouchers,
      }).unwrap();
      toast('✅ Send gift success');
      dispatch(emptyBag());
      navigate('/app/gifts');
    } catch (error: any) {
      toast.error(error.data.message, { theme: 'colored' });
    }
  };

  return (
    <>
      <PageContent>
        <Header>
          <p>Details</p>
        </Header>
        <Container>
          <GiftBagData>
            <GiftBagDetail recipient={recipient} />
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
              <CheckoutButton block onClick={openModal}>
                CHECKOUT
              </CheckoutButton>
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
                recipient={recipient}
                deleteItem={() => dispatch(removeItem(i))}
              />
            ))}
          </GiftBagItemsContainer>
        </Container>
      </PageContent>
      <CheckoutModal
        show={showModal}
        closeModal={closeModal}
        totalCost={totalCost}
        onCheckout={onCheckout}
        isLoading={isLoading}
      >
        <GiftBagData>
          <GiftBagDetail recipient={recipient} />
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
          </BillContainer>
        </GiftBagData>
      </CheckoutModal>
    </>
  );
};

export default GiftBag;
