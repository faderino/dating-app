import React from 'react';
import { FaGift } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks/store';
import { LikeResponseData } from '../../services/like.service';
import { selectProfile } from '../../store/profile/profileSlice';
import colors from '../../styles/colors';
import { PrimaryButton } from '../Button';
import Modal, {
  CloseModalBtn,
  ModalContent,
  ModalProps,
  scaleUp,
} from '../Modal/Modal';

const StyledModal = styled(Modal)`
  ${ModalContent} {
    animation: ${scaleUp} 2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  }
  ${CloseModalBtn} {
    color: ${colors.text};
    border: none;
  }
`;

const Container = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  @media screen and (min-width: 896px) {
    padding: 0 5rem 2rem 5rem;
  }
`;

const Title = styled.div`
  & > h1 {
    font-size: 2rem;
  }
  & > p {
    font-size: 1.5rem;
    span {
      display: inline-block;
      padding: 0 0.75rem 0 0.5rem;
      color: ${colors.white};
      background-image: ${colors.gradient};
      line-height: 1.5;
      transform: skew(15deg, 0deg);
      margin-left: 0.5rem;
    }
  }
  font-weight: 700;
  text-transform: uppercase;
  font-style: italic;
  margin: 2rem 0 3rem 0;
  font-family: 'Atyp Display';
`;

const PhotoContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfilePhoto = styled.div<{ img?: string }>`
  border-radius: 50%;
  width: 150px;
  aspect-ratio: 1;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: 50% 50%;
  border: 4px solid ${colors.white};
`;

const MatchedProfilePhoto = styled(ProfilePhoto)`
  margin-left: -2rem;
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2rem;
  gap: 1rem;
`;

const SendGiftButton = styled(PrimaryButton)`
  text-transform: uppercase;
  display: flex;
  gap: 1rem;
  padding: 1rem 2rem;
  span {
    font-size: 1.2rem;
  }
`;

const KeepSwipingBtn = styled.button`
  border: none;
  text-transform: uppercase;
  font-weight: 700;
  color: ${colors.textSecondary};
  cursor: pointer;
  font-size: 0.9rem;
  text-decoration: underline;
`;

type Props = ModalProps & {
  matchData?: LikeResponseData;
};

const MatchModal: React.FC<Props> = ({ show, closeModal, matchData }) => {
  const profile = useAppSelector(selectProfile);
  const navigate = useNavigate();

  return (
    <StyledModal show={show} closeModal={closeModal}>
      <Container>
        <Title>
          <h1>Congratulations</h1>
          <p>
            {"It's a "} <span>match!</span>
          </p>
        </Title>
        <PhotoContainer>
          <ProfilePhoto img={profile?.photos[0]?.image_url} />
          <MatchedProfilePhoto img={matchData?.liked_user_photo} />
        </PhotoContainer>
        <h2>{matchData?.liked_user_name}</h2>
      </Container>
      <ActionContainer>
        <SendGiftButton onClick={() => navigate('/app/gifts')}>
          <FaGift />
          <p>Send gifts</p>
        </SendGiftButton>
        <KeepSwipingBtn onClick={closeModal}>Keep swiping</KeepSwipingBtn>
      </ActionContainer>
    </StyledModal>
  );
};

export default MatchModal;
