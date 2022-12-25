import React from 'react';
import styled, { css } from 'styled-components';
import { Hobby } from '../../services/hobbies';
import colors from '../../styles/colors';

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
  onClick: (hobbyId: number) => void;
};

const HobbyBadge: React.FC<Props> = ({ active, hobby, onClick }) => {
  return (
    <Badge active={active} onClick={() => onClick(hobby.hobby_id)}>
      {hobby.title}
    </Badge>
  );
};
export default HobbyBadge;
