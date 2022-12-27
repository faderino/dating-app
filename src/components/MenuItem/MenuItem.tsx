import React from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';

export const MenuTitle = styled.div`
  text-transform: uppercase;
  font-weight: 500;
  padding: 0 1rem;
  font-size: 0.8rem;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
`;

export const MenuItemContainer = styled.div`
  padding: 1rem;
  border-top: 1px solid ${colors.gray20};
  border-bottom: 1px solid ${colors.gray20};
  background-color: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MenuItemTitle = styled.div`
  text-transform: capitalize;
`;

const MenuItemValue = styled.div`
  max-width: 55%;
  text-overflow: ellipsis;
  overflow: hidden;
  color: ${colors.textSecondary};
`;

const MenuItem: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => {
  return (
    <MenuItemContainer>
      <MenuItemTitle>{title}</MenuItemTitle>
      <MenuItemValue>{value}</MenuItemValue>
    </MenuItemContainer>
  );
};

export default MenuItem;
