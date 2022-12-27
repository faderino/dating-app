import React from 'react';
import { MdEdit } from 'react-icons/md';
import styled from 'styled-components';
import { CircleButton } from '../../components/Button';
import { Content } from '../../components/Layout/Layout';
import MenuItem, {
  MenuItemContainer,
  MenuTitle,
} from '../../components/MenuItem/MenuItem';
import { useAppDispatch } from '../../hooks/store';
import { logout } from '../../store/auth/authSlice';
import colors from '../../styles/colors';

const PageContent = styled(Content)`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ProfilePhotoContainer = styled.div`
  margin: 0 auto;
  overflow: hidden;
  height: 175px;
  width: 175px;
  border-radius: 50%;
  border: 5px solid ${colors.primary};
  margin-bottom: 1rem;
`;

const ProfilePhoto = styled.div<{ img: string }>`
  background-image: url(${(props) => props.img});
  background-size: cover;
  width: 100%;
  aspect-ratio: 1;
  background-position: 50% 50%;
  border: 6px solid ${colors.white};
  border-radius: 50%;
`;

const NameAge = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding-bottom: 2rem;
`;

const EditProfileBtn = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  p {
    font-size: 0.75rem;
    font-weight: 700;
    color: ${colors.textSecondary};
    letter-spacing: 1.2px;
  }
`;

const AccountSection = styled.div`
  background-color: ${colors.backgroundSecondary};
  padding: 1rem 0;
  flex: 1 1 auto;
`;

const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 95%;
`;

const MenuItemLogout = styled(MenuItemContainer)`
  justify-content: center;
  cursor: pointer;
  border-left: none;
  border-right: none;
`;

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <PageContent>
      <ProfilePhotoContainer>
        <ProfilePhoto img="https://res.cloudinary.com/dovwy5iam/image/upload/v1672074071/dating_apps/np39vx50uw9hudvdqdc7.jpg" />
      </ProfilePhotoContainer>
      <NameAge>Kamisato, 22</NameAge>
      <ActionContainer>
        <EditProfileBtn>
          <CircleButton>
            <MdEdit size={24} color={colors.textSecondary} />
          </CircleButton>
          <p>EDIT PROFILE</p>
        </EditProfileBtn>
      </ActionContainer>
      <AccountSection>
        <MenuTitle>Account Info</MenuTitle>
        <MenuItems>
          <MenuItem title="Email" value="kamisatoheroku@mail.com"></MenuItem>
          <MenuItemLogout as="button" onClick={() => dispatch(logout())}>
            Logout
          </MenuItemLogout>
        </MenuItems>
      </AccountSection>
    </PageContent>
  );
};

export default Profile;
