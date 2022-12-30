import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { FaArrowAltCircleDown } from 'react-icons/fa';
import styled from 'styled-components';
import colors from '../../styles/colors';
import { Profile } from '../../types/profile';
import { getAge, getFirstName } from '../../utils/format';
import {
  Card,
  Location,
  NameAge,
  NextPhoto,
  PhotoBar,
  PhotoBarContainer,
  PreviousPhoto,
} from './style';
import { HobbiesContainer } from '../../pages/Register/HobbiesForm';
import HobbyBadge from '../HobbyBadge';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const PhotoSection = styled(Card)`
  height: 50%;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-radius: 0;
  flex-shrink: 0;
`;

export const DetailSection = styled.div`
  background-color: ${colors.white};
  padding: 1rem 0 54px 0;
  position: relative;
  flex: 1;
`;

const MainDetail = styled.div`
  margin-bottom: 1.5rem;
  & > ${NameAge}, & > ${Location} {
    padding: 0 1rem;
  }
`;

const HideDetailsBtn = styled.div`
  cursor: pointer;
  display: flex;
  position: absolute;
  border-radius: 50%;
  top: -1.75rem;
  right: 1.25rem;
  background-color: ${colors.white};
`;

const DetailItem = styled.div<{ border?: 'top' | 'bottom' | 'y' }>`
  padding: 1rem;
  border-top: ${(props) =>
    props.border === 'y' || props.border === 'top'
      ? `1px solid ${colors.gray20}`
      : 'none'};
  border-bottom: ${(props) =>
    props.border === 'y' || props.border === 'bottom'
      ? `1px solid ${colors.gray20}`
      : 'none'};
  & > ${HobbiesContainer} {
    padding: 0;
  }
`;

const DetailTitle = styled.div`
  font-weight: 600;
  margin-bottom: 1rem;
`;

const StyledHobbyBadge = styled(HobbyBadge)`
  cursor: default;
`;

type Props = {
  profile?: Profile;
  photoIndex: number;
  hideDetails: () => void;
  nextPhoto: () => void;
  prevPhoto: () => void;
  className?: string;
};

const ProfileDetail: React.FC<Props> = ({
  profile,
  photoIndex,
  hideDetails,
  nextPhoto,
  prevPhoto,
  className,
}) => {
  const firstName = getFirstName(profile?.name || '');
  return (
    <Container className={className}>
      <PhotoSection img={profile?.photos[photoIndex]?.image_url}>
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
      </PhotoSection>
      <DetailSection>
        <MainDetail>
          <NameAge>
            {firstName} <span>{getAge(profile?.birthdate || '')}</span>
          </NameAge>
          <Location>
            <AiOutlineHome />
            <p>Lives in {profile?.location.city}</p>
          </Location>
        </MainDetail>
        <HideDetailsBtn onClick={hideDetails}>
          <FaArrowAltCircleDown size={48} color={colors.primary} />
        </HideDetailsBtn>
        <DetailItem border="y">
          <DetailTitle>About {firstName}</DetailTitle>
          <p>{profile?.bio}</p>
        </DetailItem>
        <DetailItem border="bottom">
          <DetailTitle>Hobbies</DetailTitle>
          <HobbiesContainer>
            {profile?.hobbies.map((hobby) => (
              <StyledHobbyBadge key={hobby.hobby_id} hobby={hobby} />
            ))}
          </HobbiesContainer>
        </DetailItem>
      </DetailSection>
    </Container>
  );
};

export default ProfileDetail;
