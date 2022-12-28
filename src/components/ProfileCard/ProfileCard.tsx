import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { MdInfo } from 'react-icons/md';
import styled from 'styled-components';
import colors from '../../styles/colors';

const Card = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: ${colors.black};
  background-image: url(https://res.cloudinary.com/dovwy5iam/image/upload/v1672112777/dating_apps/pommu3oasymipdb7dcqz.jpg);
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
  background-color: ${(props) => (props.active ? colors.white : colors.gray50)};
`;

const CardContent = styled.div`
  color: ${colors.white};
  padding: 1rem;
  position: absolute;
  width: 100%;
  bottom: 0;
  background-image: linear-gradient(
    to top,
    rgb(0, 0, 0) 0%,
    rgba(255, 255, 255, 0) 100%
  );
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

const InfoBtn = styled.button`
  color: ${colors.white};
  border: none;
  cursor: pointer;
  width: 2.75rem;
  :hover svg {
    transform: scale(1.05);
  }
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

type Props = Record<string, never>;

const ProfileCard: React.FC<Props> = () => {
  return (
    <Card>
      <PhotoBarContainer>
        <PhotoBar active />
        <PhotoBar />
        <PhotoBar />
      </PhotoBarContainer>
      <CardContent>
        <NameAge>
          Chiselliya <span>20</span>
        </NameAge>
        <Info>
          <Location>
            <AiOutlineHome />
            <p>Lives in Kota Batu</p>
          </Location>
          <InfoBtn>
            <MdInfo size={'100%'} />
          </InfoBtn>
        </Info>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
