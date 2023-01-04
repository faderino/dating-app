import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../styles/colors';

const LinkItem = styled(NavLink)`
  color: ${colors.gray30};
  transition: color 0.3s ease;
  &.active,
  :hover {
    color: ${colors.primary};
  }
`;

export type NavItemType = {
  icon?: React.ReactNode;
  text?: string;
  to: string;
};

type NavItemProps = {
  item: NavItemType;
};

const NavItem: React.FC<NavItemProps> = ({ item }) => {
  return <LinkItem to={item.to}>{item.icon}</LinkItem>;
};

export default NavItem;
