import React from 'react';
import styled from 'styled-components';
import NavItem from '../NavItem';
import { NavItemType } from '../NavItem/NavItem';
import colors from '../../styles/colors';

const Container = styled.div`
  padding: 0.5rem 0;
  border-top: 1px solid ${colors.gray20};
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media screen and (min-width: 896px) {
    width: 500px;
    margin: auto;
    justify-content: space-around;
  }
`;

type Props = {
  items: NavItemType[];
  className?: string;
};

const BottomNav: React.FC<Props> = ({ items, className }) => {
  return (
    <Container className={className}>
      <NavItems>
        {items.map((item) => (
          <NavItem key={item.to} item={item} />
        ))}
      </NavItems>
    </Container>
  );
};

export default BottomNav;
