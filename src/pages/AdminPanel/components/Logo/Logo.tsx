import React from 'react';
import styled from 'styled-components';
import colors from '../../../../styles/colors';

const LogoStyle = styled.div`
  position: relative;
  display: inline-block;
  user-select: none;
  color: ${colors.white};
  text-align: center;
  p {
    font-family: 'Atyp Display';
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.6;
  }
  span {
    position: absolute;
    text-decoration: underline;
    right: 0;
    bottom: 0;
  }
`;

const Logo: React.FC = () => {
  return (
    <LogoStyle>
      <p>digidate</p>
      <span>admin</span>
    </LogoStyle>
  );
};

export default Logo;
