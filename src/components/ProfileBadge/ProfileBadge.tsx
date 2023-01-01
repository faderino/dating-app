import React from 'react';
import styled, { css } from 'styled-components';
import colors from '../../styles/colors';

export const Badge = styled.div<Props>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${(props) => (props.isGold ? colors.gold : colors.gray10)};
  color: ${(props) => (props.isGold ? colors.gold50 : colors.text)};
  ${(props) =>
    props.size === 'lg' &&
    css`
      font-size: 1rem;
      padding: 0.4rem 0.8rem;
      font-weight: 700;
    `}
`;

type Props = {
  isGold?: boolean;
  size?: 'sm' | 'lg';
};

const ProfileBadge: React.FC<Props> = ({ isGold, size = 'sm' }) => {
  return (
    <Badge isGold={isGold} size={size}>
      {isGold ? 'GOLD' : 'FREE'}
    </Badge>
  );
};

export default ProfileBadge;
