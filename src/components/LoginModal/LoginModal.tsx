import React from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import { Logo } from '../Logo';
import Modal, { ModalProps } from '../Modal/Modal';
import LoginForm from './LoginForm';

const Container = styled.div`
  text-align: center;
  @media screen and (min-width: 896px) {
    padding: 0 5rem 2rem 5rem;
  }
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  font-style: italic;
  margin: 4rem 0 0.5rem 0;
  font-family: 'Atyp Display';
`;

const Info = styled.p`
  color: ${colors.textSecondary};
  margin-bottom: 2rem;
`;

const FormContainer = styled.div`
  max-width: 450px;
  margin: 0 auto;
`;

const LoginModal: React.FC<ModalProps> = ({ show, closeModal }) => {
  return (
    <Modal show={show} closeModal={closeModal}>
      <Container>
        <Logo color={colors.primary} size={1.2} />
        <Title>Get Started</Title>
        <Info>Please enter below details to contine.</Info>
        <FormContainer>
          <LoginForm />
        </FormContainer>
      </Container>
    </Modal>
  );
};

export default LoginModal;
