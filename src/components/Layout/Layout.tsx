import React from 'react';
import { CgCardDiamonds } from 'react-icons/cg';
import { FaCalendarDay, FaGift } from 'react-icons/fa';
import { MdPerson } from 'react-icons/md';
import { RiHeartsFill } from 'react-icons/ri';
import styled from 'styled-components';
import colors from '../../styles/colors';
import BottomNav from '../BottomNav/BottomNav';
import { Logo } from '../Logo';

const Container = styled.div`
  overflow-x: hidden;
`;

const Header = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
  background-color: ${colors.white};
  z-index: 1000;
`;

export const Content = styled.div`
  padding: 62px 0 54px 0;
`;

const Footer = styled(BottomNav)`
  position: fixed;
  width: 100%;
  bottom: 0;
  background-color: ${colors.white};
  z-index: 1000;
`;

type Props = {
  hideHeader?: boolean;
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children, hideHeader }) => {
  return (
    <Container>
      {!hideHeader && (
        <Header>
          <Logo color={colors.primary} />
        </Header>
      )}
      {children}
      <Footer
        items={[
          { to: '/app/matches', icon: <RiHeartsFill size={28} /> },
          { to: '/app/meet-up', icon: <FaCalendarDay size={24} /> },
          {
            to: '/app/recommendations',
            icon: <CgCardDiamonds size={32} />,
          },
          {
            to: '/app/gifts',
            icon: <FaGift size={28} />,
          },
          { to: '/app/profile', icon: <MdPerson size={28} /> },
        ]}
      />
    </Container>
  );
};

export default Layout;
