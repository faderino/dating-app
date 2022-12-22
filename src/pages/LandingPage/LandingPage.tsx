import React from 'react';
import styled from 'styled-components';
import { ping } from '../../services/ping';
import colors from '../../styles/colors';

const Container = styled.div`
  padding: 0 1rem;
`;

const AtypDisplayFont = styled.div`
  font-family: 'Atyp Display';
  margin-bottom: 0.5rem;
`;

const PrimaryButton = styled.button`
  background-image: ${colors.gradient};
  border: none;
  color: #fff;
  padding: 0.75rem 3rem;
  font-weight: 600;
  position: relative;
  span {
    background-color: rgba(17, 20, 24, 0.16);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }
  :hover > span {
    opacity: 1;
  }
`;

type Props = Record<string, never>;

const LandingPage: React.FC<Props> = () => {
  return (
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
      <PrimaryButton onClick={ping}>
        <div>Ping!</div>
        <span></span>
      </PrimaryButton>
    </Container>
  );
};

export default LandingPage;
