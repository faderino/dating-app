import React from 'react';
import styled, { keyframes } from 'styled-components';
import PhotoInput from '../../components/PhotoInput';
import { useGetProfileQuery } from '../../services/profile';
import colors from '../../styles/colors';

export const slideUp = keyframes`
  0% {
    transform: translateY(100%)
  }
  100% {
    transform: translate(0)
  }
`;

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: ${colors.backgroundSecondary};
  animation: ${slideUp} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
`;

const PhotoInputContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  & > div {
    flex: 0 1 30%;
  }
`;

const EditProfile: React.FC = () => {
  const { data: user } = useGetProfileQuery();

  return (
    <PageContainer>
      <PhotoInputContainer>
        {[...Array(10)].map((_, i) => (
          <PhotoInput
            key={i}
            preview={user?.profile.photos[i]?.image_url}
            name="files"
            onChange={() => {}}
            deleteFile={() => {}}
          />
        ))}
      </PhotoInputContainer>
    </PageContainer>
  );
};

export default EditProfile;
