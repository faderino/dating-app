import React from 'react';
import styled from 'styled-components';
import { PrimaryButton, SimpleButton } from '../../components/Button';
import Modal from '../../components/Modal/Modal';
import useModal from '../../hooks/modal';
import { ping } from '../../services/ping';
import colors from '../../styles/colors';

const Container = styled.div`
  padding: 0 1rem;
`;

const AtypDisplayFont = styled.div`
  font-family: 'Atyp Display';
  margin-bottom: 0.5rem;
`;

type Props = Record<string, never>;

const LandingPage: React.FC<Props> = () => {
  const { showModal, openModal, closeModal } = useModal();
  return (
    <>
      <Container>
        <AtypDisplayFont>
          <h1 style={{ backgroundColor: colors.black, color: colors.white }}>
            digidate
          </h1>
          <p style={{ fontWeight: 400 }}>Regular font weight.</p>
          <p style={{ fontWeight: 500 }}>Medium font weight.</p>
          <p style={{ fontWeight: 700 }}>Bold font weight.</p>
        </AtypDisplayFont>
        <div style={{ marginBottom: '0.5rem' }}>
          <p style={{ fontWeight: 400 }}>Regular font weight.</p>
          <p style={{ fontWeight: 500 }}>Medium font weight.</p>
          <p style={{ fontWeight: 700 }}>Bold font weight.</p>
        </div>
        <PrimaryButton onClick={ping}>Ping!</PrimaryButton>
        <SimpleButton onClick={ping}>Ping!</SimpleButton>
        <div style={{ backgroundColor: 'gray' }}>
          <SimpleButton outlined onClick={openModal}>
            Ping!
          </SimpleButton>
        </div>
      </Container>
      <Modal show={showModal} closeModal={closeModal}></Modal>
    </>
  );
};

export default LandingPage;
