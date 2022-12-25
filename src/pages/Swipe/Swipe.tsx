import React from 'react';
import { PrimaryButton } from '../../components/Button';
import { useAppDispatch } from '../../hooks/store';
import { logout } from '../../store/auth/authSlice';

type Props = Record<string, never>;

const Swipe: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <div>Swipe</div>
      <PrimaryButton onClick={() => dispatch(logout())}>Log out</PrimaryButton>
    </div>
  );
};

export default Swipe;
