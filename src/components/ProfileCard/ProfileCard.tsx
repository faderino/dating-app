import React, { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { MdInfo } from 'react-icons/md';
import { Profile } from '../../types/profile';
import { getAge, getFirstName } from '../../utils/format';
import ProfileDetail from './ProfileDetail';
import {
  Bio,
  Card,
  CardContent,
  Info,
  InfoBtn,
  Location,
  NameAge,
  NextPhoto,
  PhotoBar,
  PhotoBarContainer,
  PhotoCaption,
  PreviousPhoto,
} from './style';

type Props = {
  profile?: Profile;
  handleSwipe?: () => void;
};

const ProfileCard: React.FC<Props> = ({ profile }) => {
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
    return (
      <ProfileDetail
        profile={profile}
        hideDetails={hideDetails}
        photoIndex={photoIndex}
        nextPhoto={nextPhoto}
        prevPhoto={prevPhoto}
      />
    );

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
        <Info>
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
