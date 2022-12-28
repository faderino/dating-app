import React from 'react';
import Card from '../../components/ProfileCard';
import { Content } from '../../components/Layout';
import styled from 'styled-components';

const PageContent = styled(Content)`
  height: 100vh;
`;

const CardsContainer = styled.div`
  width: 98%;
  height: 99%;
  margin: auto;
`;

type Props = Record<string, never>;

const Recommendations: React.FC<Props> = () => {
  return (
    <PageContent>
      <CardsContainer>
        <Card />
      </CardsContainer>
    </PageContent>
  );
};

export default Recommendations;
