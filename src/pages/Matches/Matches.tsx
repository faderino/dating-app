import React, { useState } from 'react';
import styled from 'styled-components';
import { Content } from '../../components/Layout';
import MatchCard from '../../components/MatchCard';
import Pagination from '../../components/Pagination';
import useModal from '../../hooks/modal';
import { useAppSelector } from '../../hooks/store';
import { Match, useGetMatchesQuery } from '../../services/like.service';
import { selectProfile } from '../../store/profile/profileSlice';
import colors from '../../styles/colors';
import { Profile } from '../../types/profile';
import MatchDetailModal from './MatchDetailModal';

const PageContent = styled(Content)``;

const Container = styled.div`
  width: 95%;
  max-width: 1024px;
  margin: auto;
`;

const Header = styled.div`
  border-bottom: 1px solid ${colors.gray20};
  padding: 1rem;
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  p {
    max-width: 1024px;
    margin: auto;
  }
`;

const Ads = styled.p`
  text-align: center;
  margin-bottom: 1rem;
`;

const MatchesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  width: 100%;
  @media screen and (min-width: 340px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  }
  @media screen and (min-width: 768px) {
    gap: 1rem;
  }
  @media screen and (min-width: 896px) {
    gap: 2rem;
  }
`;

const PaginationContainer = styled.div`
  margin-bottom: 1rem;
`;

const Matches: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data: matches } = useGetMatchesQuery(page);
  const profile = useAppSelector(selectProfile);
  const matchCount = matches?.data.length;
  const { closeModal, openModal, showModal } = useModal();
  const [detailData, setDetailData] = useState<Profile>();

  const handleOpenModal = (match: Match) => {
    setDetailData(match.liked_user);
    openModal();
  };

  const changePage = (p: number) => {
    setPage(p);
  };

  return (
    <>
      <PageContent>
        <Header>
          <p>{matchCount} Matches</p>
        </Header>
        <Container>
          {!profile?.gold_profile && (
            <Ads>Upgrade to Gold to match more people.</Ads>
          )}
          <PaginationContainer>
            {matches ? (
              <Pagination
                pageData={{
                  page: matches.page,
                  size: matches.size,
                  count: matches.count,
                  total_pages: matches.total_pages,
                }}
                changePage={changePage}
              />
            ) : null}
          </PaginationContainer>
          <MatchesContainer>
            {matches?.data.map((match) => (
              <MatchCard
                key={match.like_id}
                profile={match.liked_user}
                onClick={() => handleOpenModal(match)}
              />
            ))}
          </MatchesContainer>
        </Container>
      </PageContent>
      <MatchDetailModal
        show={showModal}
        closeModal={closeModal}
        detailData={detailData}
      />
    </>
  );
};

export default Matches;
