import React, { useEffect, useState } from 'react';
import ProfileCard from '../../components/ProfileCard';
import { useGetRecommendationsQuery } from '../../services/recommendations.service';
import { Profile } from '../../types/profile';
import { PageContent, Stack, StackItem } from './styles';
import { LikeResponseData, useLikeMutation } from '../../services/like.service';
import useModal from '../../hooks/modal';
import { toast } from 'react-toastify';
import MatchModal from '../../components/MatchModal';
import { useGetProfileQuery } from '../../services/profile.service';

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
    if (stack.length === 3) {
      const nextPage = (page % recommendations!.total_pages) + 1;
      if (page === 1 && nextPage === 1) {
        setPage(0);
      } else {
        setPage(nextPage);
      }
    }
    const copyStack = [...stack];
    const currentProfile = copyStack.pop();
    setStack(copyStack);
    if (action === 'like') {
      try {
        const resp = await like({
          liked_user_id: currentProfile!.profile_id,
        }).unwrap();
        if (resp.data.match) {
          setMatchData(resp.data);
          openModal();
        }
      } catch (error: any) {
        toast.error(error.data.message, { theme: 'colored' });
      }
    }
  };

  return (
    <>
      <PageContent>
        <Stack>
          {stack.map((profile, i) => {
            const isTop = i === stack.length - 1;
            return (
              <StackItem key={i} handleSwipe={handleSwipe} active={isTop}>
                <ProfileCard profile={profile} />
              </StackItem>
            );
          })}
        </Stack>
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
