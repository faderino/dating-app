import React from 'react';
import { MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CircleButton } from '../../components/Button';
import { Content } from '../../components/Layout/Layout';
import MenuItem, {
  MenuItemValue,
  MenuTitle,
} from '../../components/MenuItem/MenuItem';
import ProfileBadge from '../../components/ProfileBadge/ProfileBadge';
import useModal from '../../hooks/modal';
import { useAppDispatch } from '../../hooks/store';
import { baseApi } from '../../services/baseApi';
import { useGetProfileQuery } from '../../services/profile.service';
import { logout } from '../../store/auth/authSlice';
import colors from '../../styles/colors';
import {
  displayDate,
  displayGender,
  getAge,
  displayPreference,
} from '../../utils/format';
import SubscribeGoldModal from '../EditProfile/SubscribeGoldModal';

const PageContent = styled(Content)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
  background-color: ${colors.backgroundSecondary};
`;

const ProfileSection = styled.div`
  background-color: ${colors.white};
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
`;

export const ProfilePhotoContainer = styled.div<{ isGold?: boolean }>`
  margin: 2rem auto 1rem auto;
  overflow: hidden;
  height: 175px;
  width: 175px;
  border-radius: 50%;
  border: 6px solid ${(props) => (props.isGold ? colors.gold : colors.primary)};
  flex-shrink: 0;
`;

export const ProfilePhoto = styled.div<{ img?: string }>`
  background-image: url(${(props) => props.img});
  background-size: cover;
  width: 100%;
  aspect-ratio: 1;
  background-position: 50% 50%;
  border: 7px solid ${colors.white};
  border-radius: 50%;
`;

const NameAge = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
  margin-top: -2rem;
  margin-bottom: 2rem;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px doub ${colors.gray20};
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
  padding: 1rem 0 2rem 0;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoItem = styled.div`
  margin-bottom: 1rem;
`;

const LogoutBtn = styled.button`
  margin: 0 auto;
  cursor: pointer;
  border: none;
`;

const BadgeContainer = styled.div`
  display: flex;
  justify-content: center;
  transform: translateY(-2.5rem);
`;

const GoldProfilePromo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  p {
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  span {
    color: ${colors.textSecondary};
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }
`;

const GetGoldProfileButton = styled.button`
  border: none;
  background-color: ${colors.white};
  color: ${colors.gold50};
  padding: 1rem 2rem;
  font-size: 0.85rem;
  font-weight: 700;
  border-radius: 2rem;
  margin-bottom: 1rem;
  cursor: pointer;
  box-shadow: 8px 10px 16px rgba(0, 0, 0, 0.05);
`;

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: user } = useGetProfileQuery();
  const profilePhoto = user?.profile.photos[0]?.image_url;
  const { closeModal, openModal, showModal } = useModal();

  const handleLogout = () => {
    dispatch(baseApi.util.resetApiState());
    navigate('/');
    dispatch(logout());
  };

  return (
    <>
      <PageContent>
        <ProfileSection>
          <ProfilePhotoContainer isGold={user?.profile.gold_profile}>
            <ProfilePhoto img={profilePhoto} />
          </ProfilePhotoContainer>
          <BadgeContainer>
            <ProfileBadge size="lg" isGold={user?.profile.gold_profile} />
          </BadgeContainer>
          <NameAge>
            {user?.profile.name}, {getAge(user?.profile.birthdate || '')}
          </NameAge>
          <ActionContainer>
            <EditProfileBtn>
              <CircleButton onClick={() => navigate('edit')}>
                <MdEdit size={24} color={colors.textSecondary} />
              </CircleButton>
              <p>EDIT PROFILE</p>
            </EditProfileBtn>
          </ActionContainer>
        </ProfileSection>
        <AccountSection>
          <div>
            <GoldProfilePromo>
              <p>✨ Get Unlimited Likes ✨</p>
              <span>Unlimited Likes, Spotlight & More!</span>
              <GetGoldProfileButton onClick={openModal}>
                GET DIGIDATE GOLD
              </GetGoldProfileButton>
            </GoldProfilePromo>
            <InfoItem>
              <MenuTitle>Account Info</MenuTitle>
              <MenuItem border="y">
                <p>Email</p>
                <MenuItemValue>{user?.email}</MenuItemValue>
              </MenuItem>
              <MenuItem border="bottom">
                <p>Birthdate</p>
                <MenuItemValue>
                  {displayDate(user?.profile.birthdate || '')}
                </MenuItemValue>
              </MenuItem>
              <MenuItem border="bottom">
                <p>Profile</p>
                <MenuItemValue>
                  {user?.profile.gold_profile
                    ? `GOLD | exp. ${displayDate(
                        user?.profile.gold_expiry_date || '',
                      )}`
                    : 'FREE'}
                </MenuItemValue>
              </MenuItem>
            </InfoItem>
            <InfoItem>
              <MenuTitle>Gender & Preference</MenuTitle>
              <MenuItem border="y">
                <p>Gender</p>
                <MenuItemValue>
                  {displayGender(user?.profile.gender)}
                </MenuItemValue>
              </MenuItem>
              <MenuItem border="bottom">
                <p>Preference</p>
                <MenuItemValue>
                  {displayPreference(user?.profile.gender)}
                </MenuItemValue>
              </MenuItem>
            </InfoItem>
          </div>
          <MenuItem border="y" onClick={handleLogout}>
            <LogoutBtn>Logout</LogoutBtn>
          </MenuItem>
        </AccountSection>
      </PageContent>
      <SubscribeGoldModal show={showModal} closeModal={closeModal} />
    </>
  );
};

export default Profile;
