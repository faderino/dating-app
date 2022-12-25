import React from 'react';
import styled from 'styled-components';
import { SimpleButton } from '../../components/Button';
import LoginModal from '../../components/LoginModal/LoginModal';
import RegisterModal from '../../pages/Register/RegisterModal';
import useModal from '../../hooks/modal';
import colors from '../../styles/colors';

const Background = styled.div`
  background-image: ${colors.gradient};
  position: relative;
`;

const Container = styled.div`
  padding: 0 2rem;
  height: 100vh;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 75%;
  @media screen and (min-width: 896px) {
    height: 45%;
    justify-content: end;
    margin-bottom: 3rem;
  }
`;

const Title = styled.h1`
  font-family: 'Atyp Display';
  font-weight: 700;
  font-size: 3rem;
  color: ${colors.white};
  @media screen and (min-width: 896px) {
    font-size: 5rem;
  }
`;

const ActionContainer = styled.div`
  margin: 0 auto;
  max-width: 500px;
`;

const ActionButton = styled(SimpleButton)`
  font-size: 1.2rem;
  padding: 0.75rem 0;
  margin: 0 auto 1.25rem auto;
`;

const LandingPage: React.FC = () => {
  const {
    closeModal: closeRegisterModal,
    openModal: openRegisterModal,
    showModal: showRegisterModal,
  } = useModal();
  const { closeModal, openModal, showModal } = useModal();
  return (
    <Background>
      <Container>
        <TitleSection>
          <Title>digidate</Title>
        </TitleSection>
        <ActionContainer>
          <ActionButton block onClick={openRegisterModal}>
            Create account
          </ActionButton>
          <ActionButton block outlined onClick={openModal}>
            Log in
          </ActionButton>
        </ActionContainer>
      </Container>
      <RegisterModal show={showRegisterModal} closeModal={closeRegisterModal} />
      <LoginModal show={showModal} closeModal={closeModal} />
    </Background>
  );
};

export default LandingPage;
