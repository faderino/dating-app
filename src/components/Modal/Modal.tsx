import React from 'react';
import styled, { keyframes } from 'styled-components';
import colors from '../../styles/colors';
import { FaTimes } from 'react-icons/fa';

export const scale = keyframes`
  0% {
    transform:scale(0.5);
  }
  100% {
    transform:scale(1);
  }
`;

export const ModalContainer = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalContent = styled.div`
  background-color: ${colors.white};
  padding: 1rem;
  width: 100vw;
  height: 100vh;
  animation: ${scale} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
`;

export const ModalAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2.5rem;
`;

const CloseButton = styled.button`
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
  :hover {
    color: ${colors.gray60};
    border-color: ${colors.gray60};
  }
`;

export type ModalProps = {
  show: boolean;
  closeModal?: () => void;
  children?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ show, closeModal, children }) => {
  return (
    <>
      {show && (
        <ModalContainer>
          <ModalContent>
            {children}
            <CloseButton onClick={closeModal}>
              <FaTimes size={16} color="inherit" />
            </CloseButton>
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
};

export default Modal;
