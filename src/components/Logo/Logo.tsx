import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLogo = styled(Link)<Props>`
  text-decoration: none;
  font-family: 'Atyp Display';
  font-size: ${(props) => props.size}rem;
  font-weight: 700;
  color: ${(props) => (props.color ? props.color : 'inherit')};
`;

type Props = {
  size?: number;
  color?: string;
  className?: string;
};

export const Logo: React.FC<Props> = ({ size = 2, color, className }) => {
  return (
    <StyledLogo to="/app" size={size} color={color} className={className}>
      digidate
    </StyledLogo>
  );
};
