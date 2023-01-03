import React from 'react';
import styled, { css } from 'styled-components';
import Modal, { CloseModalBtn, ModalProps } from '../../components/Modal/Modal';
import MatchCard from '../../components/MatchCard';
import { Match } from '../../services/like.service';
import colors from '../../styles/colors';
import { Profile } from '../../types/profile';
import Pagination, { PageData } from '../../components/Pagination/Pagination';

const StyledModal = styled(Modal)`
  ${CloseModalBtn} {
    display: none;
  }
`;

const DoneButton = styled.button`
  border: none;
  color: ${colors.primary};
  position: absolute;
  right: 0.5rem;
  top: 1.25rem;
  padding: 1rem;
  font-weight: 600;
  cursor: pointer;
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

const MatchesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  width: 100%;
  padding-bottom: 2rem;
  @media screen and (min-width: 340px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
  }
  @media screen and (min-width: 768px) {
    gap: 1rem;
  }
  @media screen and (min-width: 896px) {
    gap: 2rem;
  }
`;

const StyledMatchCard = styled(MatchCard)<{ active?: boolean }>`
  min-height: 200px;
  position: relative;
  ${(props) =>
    props.active &&
    css`
      border: 5px solid ${colors.primary};
    `}
`;

const PaginationContainer = styled.div`
  margin-bottom: 1rem;
`;

type Props = ModalProps & {
  matches?: Match[];
  selectedRecipient?: Profile;
  onSelectRecipient: (recipient: Profile) => void;
  changePage?: (p: number) => void;
  pageData?: PageData;
};

const SelectRecipientModal: React.FC<Props> = ({
  show,
  closeModal,
  matches,
  selectedRecipient,
  onSelectRecipient,
  changePage,
  pageData,
}) => {
  const matchCount = matches?.length;

  return (
    <StyledModal show={show} closeModal={closeModal}>
      <DoneButton onClick={closeModal}>DONE</DoneButton>
      <Header>
        <p>{matchCount} Matches</p>
      </Header>
      <PaginationContainer>
        {matches ? (
          <Pagination pageData={pageData!} changePage={changePage!} />
        ) : null}
      </PaginationContainer>
      <MatchesContainer>
        {matches?.map((match) => (
          <StyledMatchCard
            key={match.like_id}
            profile={match.liked_user}
            active={selectedRecipient?.profile_id === match.liked_user_id}
            onClick={() => onSelectRecipient(match.liked_user)}
          />
        ))}
      </MatchesContainer>
    </StyledModal>
  );
};

export default SelectRecipientModal;
