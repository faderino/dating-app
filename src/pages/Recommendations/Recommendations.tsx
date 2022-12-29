import React, { useEffect, useState } from 'react';
import ProfileCard from '../../components/ProfileCard';
import { useGetRecommendationsQuery } from '../../services/recommendations';
import { Profile } from '../../types/profile';
import { IoMdClose, IoMdHeart } from 'react-icons/io';
import {
  ActionButtons,
  LikeButton,
  PageContent,
  SkipButton,
  Stack,
  StackItem,
} from './styles';
import { useLikeMutation } from '../../services/like';
import { AnimatePresence } from 'framer-motion';

const Recommendations: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data: recommendations } = useGetRecommendationsQuery(page);
  const [stack, setStack] = useState<Profile[]>([]);
  const [like] = useLikeMutation();

  useEffect(() => {
    if (recommendations) {
      const data = [...recommendations.data].reverse();
      setStack([...data, ...stack]);

      if (recommendations.total_pages === page) {
        setPage(1);
      }
    }
  }, [recommendations]);

  const handleSwipe = async (action: 'like' | 'skip') => {
    const copyStack = [...stack];
    const currentProfile = copyStack[copyStack.length - 1];
    copyStack.pop();
    setStack(copyStack);
    console.log(currentProfile);
    if (action === 'like') {
      try {
        const resp = await like({ liked_user_id: currentProfile.profile_id });
        console.log(resp);
      } catch (error) {
        console.log(error);
      }
    }
    if (copyStack.length === 3) {
      setPage((page) => page + 1);
    }
  };

  return (
    <PageContent>
      <Stack>
        <AnimatePresence>
          {stack.map((profile, i) => (
            <StackItem
              key={i}
              handleSwipe={handleSwipe}
              active={i === stack.length - 1}
            >
              <ProfileCard profile={profile} />
            </StackItem>
          ))}
        </AnimatePresence>
      </Stack>
      <ActionButtons>
        <SkipButton onClick={() => handleSwipe('skip')}>
          <IoMdClose size={32} />
        </SkipButton>
        <p>or</p>
        <LikeButton onClick={() => handleSwipe('like')}>
          <IoMdHeart size={32} />
        </LikeButton>
      </ActionButtons>
    </PageContent>
  );
};

export default Recommendations;
