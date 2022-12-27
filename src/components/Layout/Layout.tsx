import React from 'react';
import { CgCardDiamonds } from 'react-icons/cg';
import { MdPerson } from 'react-icons/md';
import { RiHeartsFill } from 'react-icons/ri';
import styled from 'styled-components';
import colors from '../../styles/colors';
import BottomNav from '../BottomNav/BottomNav';
import { Logo } from '../Logo';

const Container = styled.div`
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
`;

const Content = styled.div`
  flex: 1;
`;

const Footer = styled(BottomNav)`
  position: fixed;
  width: 100%;
  bottom: 0;
`;

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <Header>
        <Logo color={colors.primary} />
      </Header>
      <Content>{children}</Content>
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
