import { PanInfo, motion, useAnimationControls } from 'framer-motion';
import React, { useEffect } from 'react';

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
  const controls = useAnimationControls();

  const swipeLeft = () =>
    controls.start({
      x: -1000,
      opacity: 0,
      transition: { duration: 0.3 },
    });

  const swipeRight = () =>
    controls.start({
      x: 1000,
      opacity: 0,
      transition: { duration: 0.3 },
    });

  useEffect(() => {
    const handleArrowKey = (e: KeyboardEvent) => {
      e.preventDefault();
      if (active) {
        if (e.key === 'ArrowRight') {
          swipeRight();
          setTimeout(() => {
            handleSwipe('like'); // TODO: change skip to like
          }, 300);
        } else if (e.key === 'ArrowLeft') {
          swipeLeft();
          setTimeout(() => {
            handleSwipe('skip');
          }, 300);
        }
      }
    };
    document.addEventListener('keydown', handleArrowKey);
    return () => document.removeEventListener('keydown', handleArrowKey);
  }, [active]);

  const onDragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x > 350) {
      swipeRight();
      setTimeout(() => {
        handleSwipe('like'); // TODO: change skip to like
      }, 300);
    } else if (info.offset.x < -350) {
      swipeLeft();
      setTimeout(() => {
        handleSwipe('skip');
      }, 300);
    }
  };

  return (
    <motion.div
      className={className}
      drag={active}
      initial={false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragSnapToOrigin
      onDragEnd={onDragEnd}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export default SwipeCard;
