import moment from 'moment';
import React from 'react';
import { FaHeart } from 'react-icons/fa';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks/store';
import {
  ProfilePhoto,
  ProfilePhotoContainer,
} from '../../pages/Profile/Profile';
import { Schedule } from '../../services/meetup.service';
import { selectProfile } from '../../store/profile/profileSlice';
import colors from '../../styles/colors';
import { getFirstName } from '../../utils/format';

const MeetUpItemContainer = styled.div`
  border-radius: 0.5rem;
  border: 1px solid ${colors.gray20};
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  :hover {
    box-shadow: 8px 10px 16px rgba(0, 0, 0, 0.05);
  }
`;

const PhotoSection = styled.div`
  display: flex;
  align-items: center;
  border-right: 1px solid ${colors.gray20};
  padding-right: 0.5rem;
  gap: 0.5rem;
`;

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    color: ${colors.textSecondary};
  }
`;

const Photo = styled(ProfilePhotoContainer)`
  width: 50px;
  height: 50px;
  margin: 0;
  border: none;
  &,
  ${ProfilePhoto} {
    border-width: 2px;
  }
`;

const ScheduleDataSection = styled.div`
  width: 100%;
`;

const DateTime = styled.div`
  margin-bottom: 1rem;
  p {
    font-size: 0.9rem;
    color: ${colors.textSecondary};
  }
`;

const Action = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.5rem;
  button {
    cursor: pointer;
    border-radius: 0.5rem;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.5rem;
  }
`;

const AcceptButton = styled.button`
  border: 2px solid ${colors.green40};
  color: ${colors.green40};
`;

const RescheduleButton = styled.button`
  border: 2px solid ${colors.gray40};
  color: ${colors.gray40};
`;

type Props = {
  schedule?: Schedule;
  type?: 'invitation' | 'voucher' | 'schedule';
  onAccept?: () => void;
};

const MeetUpItem: React.FC<Props> = ({ schedule, type, onAccept }) => {
  const profile = useAppSelector(selectProfile);

  const actionContent = () => {
    if (type === 'invitation') {
      return (
        <>
          <RescheduleButton>RE-SCHED</RescheduleButton>
          <AcceptButton onClick={onAccept}>ACCEPT</AcceptButton>
        </>
      );
    }
    return null;
  };

  return (
    <MeetUpItemContainer>
      <PhotoSection>
        <PhotoContainer>
          <Photo>
            <ProfilePhoto
              img={schedule?.first_party_user?.photos[0]?.image_url}
            />
          </Photo>
          <p>
            {profile?.profile_id === schedule?.first_party_user_id
              ? 'You'
              : getFirstName(schedule?.first_party_user?.name || '')}
          </p>
        </PhotoContainer>
        <FaHeart
          color={colors.primary}
          style={{
            margin: '0 -1rem',
            zIndex: 1,
            transform: 'translateY(-0.5rem)',
          }}
        />
        <PhotoContainer>
          <Photo>
            <ProfilePhoto
              img={schedule?.second_party_user?.photos[0]?.image_url}
            />
          </Photo>
          <p>
            {profile?.profile_id === schedule?.second_party_user_id
              ? 'You'
              : getFirstName(schedule?.second_party_user?.name || '')}
          </p>
        </PhotoContainer>
      </PhotoSection>
      <ScheduleDataSection>
        <h4>{schedule?.venue?.name}</h4>
        <DateTime>
          <p>{moment(schedule?.date_time).format('MMMM Do YYYY, HH:mm')}</p>
        </DateTime>
        <Action>{actionContent()}</Action>
      </ScheduleDataSection>
    </MeetUpItemContainer>
  );
};

export default MeetUpItem;
