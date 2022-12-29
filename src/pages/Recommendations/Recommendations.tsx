import React, { useEffect, useState } from 'react';
import ProfileCard from '../../components/ProfileCard';
import { useGetRecommendationsQuery } from '../../services/recommendations';
import { Profile } from '../../types/profile';
import { PageContent, Stack, StackItem } from './styles';
import { LikeResponseData, useLikeMutation } from '../../services/like';
import { AnimatePresence } from 'framer-motion';
import useModal from '../../hooks/modal';
import { toast } from 'react-toastify';
import MatchModal from '../../components/MatchModal';
import { useGetProfileQuery } from '../../services/profile';

const Recommendations: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { data: recommendations } = useGetRecommendationsQuery(page);
  const [stack, setStack] = useState<Profile[]>([]);
  const [like] = useLikeMutation();
  const { closeModal, openModal, showModal } = useModal();
  const [matchData, setMatchData] = useState<LikeResponseData>();
  useGetProfileQuery();

  useEffect(() => {
    if (recommendations) {
      const data = [...recommendations.data].reverse();
      setStack([...data, ...stack]);
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
        const resp = await like({
          liked_user_id: currentProfile.profile_id,
        }).unwrap();
        console.log(resp);
        if (resp.data.match) {
          setMatchData(resp.data);
          openModal();
        }
      } catch (error) {
        toast.error('Server error');
      }
    }
    if (copyStack.length === 3) {
      const nextPage = (page % recommendations!.total_pages) + 1;
      setPage(nextPage);
    }
  };

  return (
    <>
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
        {/* <ActionButtons>
        <SkipButton onClick={() => handleSwipe('skip')}>
          <IoMdClose size={32} />
        </SkipButton>
        <p>or</p>
        <LikeButton onClick={() => handleSwipe('like')}>
          <IoMdHeart size={32} />
        </LikeButton>
      </ActionButtons> */}
      </PageContent>
      <MatchModal
        matchData={matchData}
        show={showModal}
        closeModal={closeModal}
      />
    </>
  );
};

export default Recommendations;
