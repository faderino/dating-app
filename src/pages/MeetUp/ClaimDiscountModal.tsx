import React from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Modal, { ModalProps } from '../../components/Modal/Modal';
import {
  Schedule,
  useClaimVenueDiscountMutation,
  VenueDiscountVoucher,
} from '../../services/meetup.service';
import colors from '../../styles/colors';

const StyledModal = styled(Modal)`
  background-color: ${colors.gray10};
`;

const Header = styled.div`
  display: flex;
  font-size: 0.9rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  h1 {
    margin-bottom: 0.5rem;
  }
  p {
    color: ${colors.textSecondary};
  }
  margin-bottom: 2rem;
  @media screen and (min-width: 380px) {
    font-size: 1rem;
  }
`;

const DiscountsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  width: 90%;
  margin: 0 auto 2rem auto;
`;

type Props = ModalProps & {
  schedule?: Schedule;
};

const ClaimDiscountModal: React.FC<Props> = ({
  show,
  closeModal,
  schedule,
}) => {
  const [claimDiscount] = useClaimVenueDiscountMutation();

  const handleClaimDiscount = async (venueVoucherId: number) => {
    try {
      const resp = await claimDiscount({
        scheduleId: schedule!.schedule_id,
        venue_voucher_id: venueVoucherId,
      }).unwrap();
      toast(`✅ ${resp.message}`);
      closeModal();
    } catch (error: any) {
      toast.error(error.data.message, { theme: 'colored' });
    }
  };

  return (
    <StyledModal show={show} closeModal={closeModal}>
      <Header>
        <h1>Claim Discount Coupon</h1>
        <p>
          Venue discount vouchers on <b>{schedule?.venue?.name}</b>.
        </p>
      </Header>
      <DiscountsContainer>
        {schedule?.venue?.venue_vouchers?.map((discount) => (
          <DiscountCoupon
            key={discount.venue_voucher_id}
            voucher={discount}
            onClick={() => handleClaimDiscount(discount.venue_voucher_id)}
          />
        ))}
      </DiscountsContainer>
    </StyledModal>
  );
};

export default ClaimDiscountModal;

const DiscountCouponContainer = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.gray10};
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  box-shadow: 8px 10px 16px rgba(0, 0, 0, 0.05);
  position: relative;
  ::before {
    position: absolute;
    content: '';
    height: 35px;
    aspect-ratio: 1;
    top: 2.6rem;
    left: -17.5px;
    border-radius: 50%;
    z-index: 1;
    background-color: ${colors.gray10};
  }
  ::after {
    position: absolute;
    content: '';
    height: 35px;
    aspect-ratio: 1;
    top: 2.6rem;
    right: -17.5px;
    border-radius: 50%;
    z-index: 1;
    background-color: ${colors.gray10};
  }
  h1 {
    border-bottom: 2px dotted ${colors.text};
    margin-bottom: 1rem;
  }
`;

const ClaimDiscountButton = styled.button`
  border: 2px solid ${colors.primary};
  display: block;
  margin-left: auto;
  color: ${colors.primary};
  cursor: pointer;
  border-radius: 0.5rem;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.5rem;
`;

const CouponFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    color: ${colors.textSecondary};
  }
`;

const DiscountCoupon: React.FC<{
  voucher?: VenueDiscountVoucher;
  onClick: () => void;
}> = ({ voucher, onClick }) => {
  return (
    <DiscountCouponContainer>
      <h1>{voucher ? voucher.discount_amount * 100 : ''}% off</h1>
      <CouponFooter>
        <p>{voucher?.quota}x</p>
        <ClaimDiscountButton onClick={onClick}>CLAIM</ClaimDiscountButton>
      </CouponFooter>
    </DiscountCouponContainer>
  );
};
