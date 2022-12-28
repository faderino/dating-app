import React, { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { MdInfo } from 'react-icons/md';
import styled from 'styled-components';
import colors from '../../styles/colors';
import { Profile } from '../../types/profile';
import { getAge, getFirstName } from '../../utils/format';
import ProfileDetail from './ProfileDetail';

const Card = styled.div<{ img?: string }>`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: ${colors.black};
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  border-radius: 1rem;
  overflow: hidden;
`;

const PhotoBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 0.5rem;
  width: 100%;
  position: absolute;
  top: 0.25rem;
  padding: 0.25rem 1.2rem;
  height: 0.75rem;
`;

const PhotoBar = styled.div<{ active?: boolean }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    props.active ? colors.white : 'rgba(0,0,0,50%)'};
`;

const CardContent = styled.div`
  color: ${colors.white};
  padding: 1rem;
  position: absolute;
  width: 100%;
  bottom: 0;
  background-image: linear-gradient(
    to top,
    rgb(0, 0, 0) 5%,
    rgba(255, 255, 255, 0) 100%
  );
`;

const PhotoCaption = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  color: ${colors.text};
  background-color: rgba(255, 255, 255, 65%);
  padding: 0.5rem;
`;

const NameAge = styled.h1`
  span {
    font-weight: 400;
    font-size: 1.65rem;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Bio = styled.div`
  padding: 0.8rem 0;
`;

const InfoBtn = styled.button`
  color: ${colors.white};
  align-self: flex-end;
  margin-bottom: 0.5rem;
  display: flex;
  border: none;
  cursor: pointer;
  width: 2.75rem;
  :hover svg {
    transform: scale(1.05);
  }
`;

const Overlay = styled.div`
  height: 80%;
  width: 50%;
  position: absolute;
`;

const PreviousPhoto = styled(Overlay)`
  left: 0;
`;

const NextPhoto = styled(Overlay)`
  right: 0;
`;

type Props = {
  profile?: Profile;
  handleSwipe?: () => void;
};

const ProfileCard: React.FC<Props> = ({ profile, handleSwipe }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const hideDetails = () => {
    setShowDetails(false);
  };

  const nextPhoto = () => {
    setPhotoIndex((photoIndex + 1) % profile!.photos.length);
  };

  const prevPhoto = () => {
    if (photoIndex === 0) {
      return setPhotoIndex(profile!.photos.length - 1);
    }
    return setPhotoIndex(photoIndex - 1);
  };

  if (showDetails)
    return <ProfileDetail profile={profile} hideDetails={hideDetails} />;

  return (
    <Card img={profile?.photos[photoIndex]?.image_url}>
      <PreviousPhoto onClick={prevPhoto} />
      <NextPhoto onClick={nextPhoto} />
      {profile ? (
        <PhotoBarContainer>
          {profile.photos.length > 1
            ? profile.photos.map((photo, i) => (
                <PhotoBar key={photo.photo_id} active={photoIndex === i} />
              ))
            : null}
        </PhotoBarContainer>
      ) : null}

      <CardContent>
        {profile?.photos[photoIndex]?.caption ? (
          <PhotoCaption>{profile.photos[photoIndex].caption}</PhotoCaption>
        ) : null}
        <NameAge>
          {getFirstName(profile?.name || '')}{' '}
          <span>{getAge(profile?.birthdate || '')}</span>
        </NameAge>
        <Info onClick={handleSwipe}>
          <div>
            <Location>
              <AiOutlineHome />
              <p>Lives in {profile?.location.city}</p>
            </Location>
            <Bio>{profile?.bio}</Bio>
          </div>
          <InfoBtn onClick={() => setShowDetails(true)}>
            <MdInfo size={'100%'} />
          </InfoBtn>
        </Info>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
