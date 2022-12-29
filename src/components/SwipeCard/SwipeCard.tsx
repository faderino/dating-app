import { PanInfo, motion } from 'framer-motion';
import React, { useState } from 'react';
import styled from 'styled-components';

const Swipe = styled(motion.div)``;

type Props = {
  children: React.ReactNode;
  className?: string;
  handleSwipe: (action: 'like' | 'skip') => void;
};

const SwipeCard: React.FC<Props> = ({ className, handleSwipe, children }) => {
  const [leaveX, setLeaveX] = useState(0);

  const onDragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x > 400) {
      setLeaveX(1000);
      handleSwipe('like');
    }
    if (info.offset.x < -400) {
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
        transition: { duration: 0.2 },
      }}
    >
      {children}
    </Swipe>
  );
};

export default SwipeCard;
