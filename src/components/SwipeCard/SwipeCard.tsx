import { PanInfo, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Swipe = styled(motion.div)``;

type Props = {
  children: React.ReactNode;
  className?: string;
  handleSwipe: (action: 'like' | 'skip') => void;
  active?: boolean;
};

const SwipeCard: React.FC<Props> = ({
  className,
  handleSwipe,
  children,
  active,
}) => {
  const [leaveX, setLeaveX] = useState(0);

  useEffect(() => {
    const handleArrowKey = (e: KeyboardEvent) => {
      e.preventDefault();
      if (active) {
        if (e.key === 'ArrowRight') {
          console.log('arrow right');
        }
        if (e.key === 'ArrowLeft') {
          console.log('arrow left');
          handleSwipe('skip');
        }
      }
    };
    document.addEventListener('keydown', handleArrowKey);

    return () => document.removeEventListener('keydown', handleArrowKey);
  }, []);

  const onDragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x > 350) {
      setLeaveX(1000);
      handleSwipe('like');
    }
    if (info.offset.x < -350) {
      setLeaveX(-1000);
      handleSwipe('skip');
    }
  };

  return (
    <Swipe
      className={className}
      drag={true}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={onDragEnd}
      exit={{
        x: leaveX,
        opacity: 0,
        transition: { duration: 0.3 },
      }}
    >
      {children}
    </Swipe>
  );
};

export default SwipeCard;
