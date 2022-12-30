import React from 'react';
import styled, { css } from 'styled-components';
import colors from '../../styles/colors';
import { Hobby } from '../../types/profile';

const Badge = styled.div<Pick<Props, 'active'>>`
  display: inline-block;
  border: 1px solid ${colors.text};
  padding: 0.25rem 1rem;
  border-radius: 2rem;
  user-select: none;
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      border-color: ${colors.primary};
      color: ${colors.primary};
    `}
`;

type Props = {
  active?: boolean;
  hobby: Hobby;
  onClick?: (hobbyId: number) => void;
  className?: string;
};

const HobbyBadge: React.FC<Props> = ({ active, hobby, onClick, className }) => {
  return (
    <Badge
      active={active}
      onClick={() => onClick?.(hobby.hobby_id)}
      className={className}
    >
      {hobby.title}
    </Badge>
  );
};
export default HobbyBadge;
