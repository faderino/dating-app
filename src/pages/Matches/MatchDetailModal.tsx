import React, { useState } from 'react';
import { FaCalendarDay, FaGift } from 'react-icons/fa';
import styled from 'styled-components';
import Modal, { CloseModalBtn, ModalProps } from '../../components/Modal/Modal';
import { PrimaryButton } from '../../components/Button';
import ProfileDetail, {
  DetailSection,
  PhotoSection,
} from '../../components/ProfileCard/ProfileDetail';
import { Profile } from '../../types/profile';
import colors from '../../styles/colors';
import { useNavigate } from 'react-router-dom';

const StyledModal = styled(Modal)`
  ${CloseModalBtn} {
    display: none;
  }
`;

const StyledProfileDetail = styled(ProfileDetail)`
  ${PhotoSection} {
    height: 400px;
    border-radius: 0.5rem;
  }
  ${DetailSection} {
    padding-bottom: 82px;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  position: fixed;
  bottom: 0;
  right: 0;
  & > button {
    text-transform: uppercase;
    display: flex;
    gap: 1rem;
    padding: 1rem 2rem;
    span {
      font-size: 1.2rem;
    }
  }
`;

const ScheduleMeetupBtn = styled(PrimaryButton)`
  background-image: none;
  background-color: ${colors.text};
  p {
    display: none;
  }
  @media screen and (min-width: 420px) {
    p {
      display: block;
    }
  }
`;

const SendGiftButton = styled(PrimaryButton)`
  p {
    display: none;
  }
  @media screen and (min-width: 420px) {
    p {
      display: block;
    }
  }
`;

type Props = ModalProps & {
  detailData?: Profile;
};

const MatchDetailModal: React.FC<Props> = ({
  show,
  closeModal,
  detailData,
}) => {
  const navigate = useNavigate();
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleCloseModal = () => {
    setPhotoIndex(0);
    closeModal();
  };

  const nextPhoto = () => {
    setPhotoIndex((photoIndex + 1) % detailData!.photos.length);
  };

  const prevPhoto = () => {
    if (photoIndex === 0) {
      return setPhotoIndex(detailData!.photos.length - 1);
    }
    return setPhotoIndex(photoIndex - 1);
  };

  return (
    <StyledModal show={show} closeModal={handleCloseModal}>
      <StyledProfileDetail
        profile={detailData}
        hideDetails={handleCloseModal}
        nextPhoto={nextPhoto}
        prevPhoto={prevPhoto}
        photoIndex={photoIndex}
      />
      <ActionContainer>
        <ScheduleMeetupBtn
          onClick={() =>
            navigate('/app/meet-up/schedule', { state: { match: detailData } })
          }
        >
          <FaCalendarDay />
          <p>Meetup</p>
        </ScheduleMeetupBtn>
        <SendGiftButton
          onClick={() =>
            navigate('/app/gifts/buy', { state: { recipient: detailData } })
          }
        >
          <FaGift />
          <p>Send gifts</p>
        </SendGiftButton>
      </ActionContainer>
    </StyledModal>
  );
};

export default MatchDetailModal;
