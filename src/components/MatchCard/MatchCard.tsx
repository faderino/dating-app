import React from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import { Profile } from '../../types/profile';
import { getAge, getFirstName } from '../../utils/format';

const BackgroundImage = styled.div<{ img?: string }>`
  background-image: url(${(props) => props.img});
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
`;

const Card = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 325px;
  border-radius: 0.75rem;
  border: none;
  background-color: ${colors.black};
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  :hover ${BackgroundImage}, :focus ${BackgroundImage} {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 1rem 0.5rem 0.5rem 0.5rem;
  text-align: left;
  position: absolute;
  bottom: 0;
  width: 100%;
  color: ${colors.white};
  background-image: linear-gradient(
    to top,
    rgb(0, 0, 0) 0%,
    rgba(255, 255, 255, 0) 100%
  );
`;

const NameAge = styled.h3`
  span {
    font-weight: 400;
  }
`;

type Props = {
  profile?: Profile;
  onClick: () => void;
};

const MatchCard: React.FC<Props> = ({ profile, onClick }) => {
  return (
    <Card onClick={onClick}>
      <BackgroundImage img={profile?.photos[0]?.image_url}></BackgroundImage>
      <CardContent>
        <NameAge>
          {getFirstName(profile?.name || '')}
          <span> {getAge(profile?.birthdate || '0')}</span>
        </NameAge>
      </CardContent>
    </Card>
  );
};

export default MatchCard;
