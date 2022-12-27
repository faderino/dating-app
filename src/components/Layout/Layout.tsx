import React from 'react';
import { CgCardDiamonds } from 'react-icons/cg';
import { MdPerson } from 'react-icons/md';
import { RiHeartsFill } from 'react-icons/ri';
import styled from 'styled-components';
import colors from '../../styles/colors';
import BottomNav from '../BottomNav/BottomNav';
import { Logo } from '../Logo';

const Container = styled.div``;

const Header = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
`;

export const Content = styled.div`
  padding: 62px 0 54px 0;
`;

const Footer = styled(BottomNav)`
  position: fixed;
  width: 100%;
  bottom: 0;
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
          { to: '/app/matches', icon: <RiHeartsFill size={30} /> },
          {
            to: '/app/recommendations',
            icon: <CgCardDiamonds size={32} />,
          },
          { to: '/app/profile', icon: <MdPerson size={32} /> },
        ]}
      />
    </Container>
  );
};

export default Layout;
