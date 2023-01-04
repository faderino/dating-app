import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import * as FaIcons from 'react-icons/fa';
import { SidebarData } from './SidebarData';
import colors from '../../../styles/colors';
import Logo from '../components/Logo';
import { useAppDispatch } from '../../../hooks/store';
import { logout } from '../../../store/auth/authSlice';

const Navbar = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: ${colors.text};
  padding: 1rem 0;
  display: flex;
  gap: 1rem;
`;

const MenuIconOpen = styled(Link)`
  display: flex;
  justify-content: start;
  font-size: 1.5rem;
  margin-left: 2rem;
  color: ${colors.white};
`;

const MenuIconClose = styled(Link)`
  display: flex;
  justify-content: end;
  font-size: 1.5rem;
  margin-top: 0.75rem;
  margin-right: 1rem;
  color: ${colors.white};
`;

const SidebarMenu = styled.div<{ close: boolean }>`
  width: 250px;
  height: 100vh;
  background-color: ${colors.text};
  position: fixed;
  top: 0;
  left: ${({ close }) => (close ? '0' : '-100%')};
  transition: 0.6s;
`;

const MenuItems = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 90px;
  padding: 1rem;
`;

const MenuItemLinks = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 1rem;
  font-size: 20px;
  text-decoration: none;
  color: ${colors.white};
  transition: all 0.3s ease;
  width: 100%;
  border-radius: 5px;
  span {
    margin-left: 1rem;
  }
  &:hover {
    background-color: ${colors.white};
    color: ${colors.text};
    text-align: center;
  }
  .active {
    background-color: ${colors.white};
    color: ${colors.text};
    text-align: center;
  }
`;

const LogoContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const LogoutButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-size: 20px;
  text-decoration: none;
  color: ${colors.white};
  transition: all 0.3s ease;
  width: 75%;
  border: none;
  border-radius: 5px;
  bottom: 2rem;
  left: 2rem;
  cursor: pointer;
  &:hover {
    background-color: ${colors.white};
    color: ${colors.text};
    text-align: center;
  }
`;

const Sidebar: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const [close, setClose] = useState(false);
  const showSidebar = () => setClose(!close);

  return (
    <>
      <Navbar>
        <MenuIconOpen to="#" onClick={showSidebar}>
          <FaIcons.FaBars />
        </MenuIconOpen>
        <LogoContainer>
          <Logo />
        </LogoContainer>
      </Navbar>
      <SidebarMenu close={close}>
        <MenuIconClose to="#" onClick={showSidebar}>
          <FaIcons.FaTimes />
        </MenuIconClose>
        {SidebarData.map((item, index) => {
          return (
            <MenuItems key={index}>
              <MenuItemLinks to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </MenuItemLinks>
            </MenuItems>
          );
        })}
        <MenuItems>
          <LogoutButton onClick={() => dispatch(logout())}>
            <span>Log out</span>
          </LogoutButton>
        </MenuItems>
      </SidebarMenu>
    </>
  );
};

export default Sidebar;
