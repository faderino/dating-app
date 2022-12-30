import React from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';

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
  z-index: 1;
  padding: 0.5rem;
  text-align: left;
  position: absolute;
  bottom: 0;
  width: 100%;
  color: ${colors.white};
  background-image: linear-gradient(
    to top,
    rgb(0, 0, 0) 5%,
    rgba(255, 255, 255, 0) 100%
  );
`;

const NameAge = styled.h3`
  span {
    font-weight: 400;
  }
`;

const MatchCard: React.FC = () => {
  return (
    <Card>
      <BackgroundImage img="https://res.cloudinary.com/dovwy5iam/image/upload/v1672112777/dating_apps/pommu3oasymipdb7dcqz.jpg"></BackgroundImage>
      <CardContent>
        <NameAge>
          Luffy
          <span> 16</span>
        </NameAge>
      </CardContent>
    </Card>
  );
};

export default MatchCard;
