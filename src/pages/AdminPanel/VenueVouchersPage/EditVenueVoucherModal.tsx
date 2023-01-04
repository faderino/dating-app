import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import InputField from '../../../components/InputField/InputField';
import { ModalProps } from '../../../components/Modal';
import Modal, { CloseModalBtn } from '../../../components/Modal/Modal';
import Spinner from '../../../components/Spinner/Spinner';
import { VenueDiscountVoucher } from '../../../services/meetup.service';
import {
  UpdateVenueVoucherRequest,
  useUpdateVenueVoucherMutation,
} from '../../../services/venue.service';
import colors from '../../../styles/colors';
import { SaveButton } from '../../EditProfile/style';

const StyledModal = styled(Modal)`
  ${CloseModalBtn} {
    color: ${colors.text};
    border: none;
  }
`;

const Header = styled.div`
  border-bottom: 1px solid ${colors.gray20};
  padding: 1rem;
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  p {
    max-width: 1024px;
    margin: auto;
  }
`;

const FormContainer = styled.form`
  max-width: 500px;
  margin: 0 auto;
  width: 90%;
`;

type Props = ModalProps & {
  voucher?: VenueDiscountVoucher;
};

const EditVenueVoucherModal: React.FC<Props> = ({
  show,
  closeModal,
  voucher,
}) => {
  const [updateVenueVoucher, { isLoading }] = useUpdateVenueVoucherMutation();
  const [editData, setEditData] = useState({
    discount_amount: 0,
    quota: 0,
  });
  const [errors, setErrors] = useState({} as Record<string, string>);

  useEffect(() => {
    if (voucher) {
      setEditData({
        discount_amount: voucher.discount_amount,
        quota: voucher.quota,
      });
    }
  }, [voucher]);

  const validateForm = (): boolean => {
    setErrors({
      discount_amount: '',
      quota: '',
    });
    const currentErrors = {} as typeof errors;
    if (!editData.discount_amount) {
      currentErrors.discount_amount = 'Enter discount amount';
    }
    if (!editData.quota) {
      currentErrors.quota = 'Enter quota';
    }
    setErrors(currentErrors);
    return Boolean(Object.keys(currentErrors).length === 0);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const valid = validateForm();
    if (!valid) return;
    const updateVenueVoucherRequest: UpdateVenueVoucherRequest = {
      venueVoucherId: voucher!.venue_voucher_id,
      discount_amount: +editData.discount_amount,
      quota: +editData.quota,
    };
    try {
      const resp = await updateVenueVoucher(updateVenueVoucherRequest).unwrap();
      toast('✅ ' + resp.message);
      closeModal();
    } catch (error: any) {
      toast.error(error.data.message, { theme: 'colored' });
    }
  };

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  return (
    <StyledModal show={show} closeModal={closeModal}>
      <Header>
        <p>Edit Venue</p>
      </Header>
      <FormContainer onSubmit={handleSubmit}>
        <InputField
          label="Discount amount"
          placeholder="Discount amount"
          type="number"
          name="discount_amount"
          value={editData.discount_amount}
          error={errors.discount_amount}
          onChange={handleChange}
        />
        <InputField
          label="Quota"
          placeholder="Quota"
          type="number"
          name="quota"
          value={editData.quota}
          error={errors.quota}
          onChange={handleChange}
        />
        <SaveButton block type="submit">
          {isLoading ? <Spinner /> : 'SAVE'}
        </SaveButton>
      </FormContainer>
    </StyledModal>
  );
};

export default EditVenueVoucherModal;
