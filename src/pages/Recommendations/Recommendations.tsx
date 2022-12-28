import React, { useEffect, useState } from 'react';
import ProfileCard from '../../components/ProfileCard';
import { Content } from '../../components/Layout';
import styled from 'styled-components';
import { useGetRecommendationsQuery } from '../../services/recommendations';
import { Profile } from '../../types/profile';
import { IoMdClose, IoMdHeart } from 'react-icons/io';
import colors from '../../styles/colors';

const PageContent = styled(Content)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 896px) {
    max-width: 500px;
    margin: 0 auto;
  }
`;

const Stack = styled.div`
  width: 98%;
  flex: 1;
  margin: auto;
  position: relative;
`;

const StackItem = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1rem 0;
`;

const ActionButton = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 0.75rem;
  transition: transform 0.3s ease;
  :hover,
  :hover svg {
    transform: scale(1.075);
  }
`;

const LikeButton = styled(ActionButton)`
  color: ${colors.primary};
  border: 2px solid ${colors.primary};
`;

const SkipButton = styled(ActionButton)`
  color: ${colors.gray50};
  border: 2px solid ${colors.gray50};
`;

const Recommendations: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data: recommendations } = useGetRecommendationsQuery(page);
  const [stack, setStack] = useState<Profile[]>([]);

  useEffect(() => {
    if (recommendations) {
      const data = [...recommendations.data].reverse();
      setStack([...data, ...stack]);

      if (recommendations.total_pages === page) {
        setPage(1);
      }
    }
  }, [recommendations]);

  const handleSwipe = () => {
    const copyStack = [...stack];
    copyStack.pop();
    setStack(copyStack);
    if (copyStack.length === 3) {
      setPage((page) => page + 1);
    }
  };

  return (
    <PageContent>
      <Stack>
        {stack.map((profile) => (
          <StackItem key={profile.profile_id}>
            <ProfileCard profile={profile} handleSwipe={handleSwipe} />
          </StackItem>
        ))}
      </Stack>
      <ActionButtons>
        <SkipButton onClick={handleSwipe}>
          <IoMdClose size={32} />
        </SkipButton>
        <p>or</p>
        <LikeButton onClick={handleSwipe}>
          <IoMdHeart size={32} />
        </LikeButton>
      </ActionButtons>
    </PageContent>
  );
};

export default Recommendations;
