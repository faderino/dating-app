import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import colors from '../../styles/colors';
import { FaTimes } from 'react-icons/fa';

export const scaleUp = keyframes`
  0% {
    opacity: 0.2;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const scaleDown = keyframes`
  0% {
    opacity: 0.8;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.25);
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  z-index: 2000;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  @media screen and (min-width: 896px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ModalContent = styled.div<{ closing: boolean }>`
  background-color: ${colors.white};
  padding: 1rem;
  width: 100%;
  height: 100%;
  animation: ${scaleUp} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  ${(props) =>
    props.closing &&
    css`
      animation: ${scaleDown} 0.25s ease-out forwards;
    `}
  @media screen and (min-width: 896px) {
    max-width: 750px;
    height: auto;
    max-height: 850px;
    overflow: auto;
    border-radius: 0.75rem;
  }
`;

export const ModalAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2.5rem;
`;

export const CloseModalBtn = styled.button`
  cursor: pointer;
  background-color: transparent;
  border-radius: 50%;
  padding: 3px;
  color: ${colors.gray40};
  border: 3px solid ${colors.gray40};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  margin: 1rem;
  transition: all 0.3s ease;
  :hover {
    color: ${colors.gray60};
    border-color: ${colors.gray60};
    transform: rotate(90deg);
  }
`;

export type ModalProps = {
  show: boolean;
  closeModal: () => void;
  children?: React.ReactNode;
  className?: string;
};

type ModalState = 'show' | 'closing' | 'close';

const Modal: React.FC<ModalProps> = ({
  show,
  closeModal,
  children,
  className,
}) => {
  const [modalState, setModalState] = useState<ModalState>('close');

  useEffect(() => {
    if (modalState === 'show') {
      document.body.style.overflow = 'hidden';
    } else if (modalState === 'close') {
      document.body.style.overflow = 'unset';
    }
  }, [modalState]);

  useEffect(() => {
    if (modalState === 'show' && !show) {
      return setModalState('closing');
    }
    if (!show) return setModalState('close');
    return setModalState('show');
  }, [show]);

  const handleClose = () => {
    if (modalState === 'closing') setModalState('close');
  };

  return modalState !== 'close' ? (
    <Backdrop>
      <ModalContent
        className={className}
        closing={modalState === 'closing'}
        onAnimationEnd={handleClose}
      >
        {children}
        <CloseModalBtn onClick={closeModal}>
          <FaTimes size={16} color="inherit" />
        </CloseModalBtn>
      </ModalContent>
    </Backdrop>
  ) : null;
};

export default Modal;
