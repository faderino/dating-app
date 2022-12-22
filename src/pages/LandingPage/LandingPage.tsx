import React from 'react';
import { ping } from '../../services/ping';

type Props = Record<string, never>;

const LandingPage: React.FC<Props> = () => {
  return (
    <div>
      <button onClick={ping}>Ping!</button>
    </div>
  );
};

export default LandingPage;
