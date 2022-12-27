import React from 'react';
import styled from 'styled-components';
import NavItem from '../NavItem';
import { NavItemType } from '../NavItem/NavItem';
import colors from '../../styles/colors';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0.5rem 0;
  border-top: 1px solid ${colors.gray20};
`;

type Props = {
  items: NavItemType[];
  className?: string;
};

const BottomNav: React.FC<Props> = ({ items, className }) => {
  return (
    <Container className={className}>
      {items.map((item) => (
        <NavItem key={item.to} item={item} />
      ))}
    </Container>
  );
};

export default BottomNav;
