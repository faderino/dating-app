import React from 'react';
import styled from 'styled-components';
import { SimpleButton } from '../../components/Button';
import LoginModal from '../../components/LoginModal/LoginModal';
import { Logo } from '../../components/Logo/Logo';
import useModal from '../../hooks/modal';
import colors from '../../styles/colors';

const Background = styled.div`
  background-image: ${colors.gradient};
  position: relative;
`;

const Container = styled.div`
  padding: 0 3rem;
  height: 100vh;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 75%;
`;

const ActionButton = styled(SimpleButton)`
  font-size: 1.2rem;
  padding: 0.75rem 0;
  margin-bottom: 1.25rem;
`;

type Props = Record<string, never>;

const LandingPage: React.FC<Props> = () => {
  const { closeModal, openModal, showModal } = useModal();
  return (
    <Background>
      <Container>
        <TitleSection>
          <Logo color={colors.white} size={3} />
        </TitleSection>
        <ActionButton block>Create account</ActionButton>
        <ActionButton block outlined onClick={openModal}>
          Log in
        </ActionButton>
      </Container>
      <LoginModal show={showModal} closeModal={closeModal} />
    </Background>
  );
};

export default LandingPage;
