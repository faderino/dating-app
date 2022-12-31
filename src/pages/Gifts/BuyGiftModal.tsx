import React, { useState } from 'react';
import { FaCalendarDay, FaGift } from 'react-icons/fa';
import styled from 'styled-components';
import Modal, { CloseModalBtn, ModalProps } from '../../components/Modal/Modal';
import { PrimaryButton } from '../../components/Button';
import colors from '../../styles/colors';
import { GiftVoucher } from '../../services/gifts.service';

const StyledModal = styled(Modal)``;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  position: fixed;
  bottom: 0;
  right: 0;
  & > button {
    text-transform: uppercase;
    display: flex;
    gap: 1rem;
    padding: 1rem 2rem;
    span {
      font-size: 1.2rem;
    }
  }
`;

type Props = ModalProps & {
  selectedGiftVoucher?: GiftVoucher;
};

const BuyGiftModal: React.FC<Props> = ({
  show,
  closeModal,
  selectedGiftVoucher,
}) => {
  return <StyledModal show={show} closeModal={closeModal}></StyledModal>;
};

export default BuyGiftModal;
