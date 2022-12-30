import React from 'react';
import styled from 'styled-components';
import { Content } from '../../components/Layout';
import MatchCard from '../../components/MatchCard';
import colors from '../../styles/colors';

const PageContent = styled(Content)``;

const Header = styled.div`
  border-bottom: 1px solid ${colors.gray20};
  padding: 1rem;
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const Ads = styled.p`
  text-align: center;
  margin-bottom: 1rem;
`;

const MatchesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.5rem;
  width: 95%;
  margin: 0 auto;
`;

const Matches: React.FC = () => {
  return (
    <PageContent>
      <Header>10 Matches</Header>
      <Ads>Upgrade to Gold to match more people.</Ads>
      <MatchesContainer>
        {[...Array(9)].map((_, i) => (
          <MatchCard key={i} />
        ))}
      </MatchesContainer>
    </PageContent>
  );
};

export default Matches;
