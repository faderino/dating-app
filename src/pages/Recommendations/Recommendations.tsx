import React, { useEffect, useState } from 'react';
import ProfileCard from '../../components/ProfileCard';
import { Content } from '../../components/Layout';
import styled from 'styled-components';
import { useGetRecommendationsQuery } from '../../services/recommendations';
import { Profile } from '../../types/profile';

const PageContent = styled(Content)`
  height: 100vh;
`;

const StackList = styled.div`
  width: 98%;
  height: 99%;
  margin: auto;
  position: relative;
`;

const StackItem = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
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
      <StackList>
        {stack.map((profile) => (
          <StackItem key={profile.profile_id}>
            <ProfileCard profile={profile} handleSwipe={handleSwipe} />
          </StackItem>
        ))}
      </StackList>
    </PageContent>
  );
};

export default Recommendations;
