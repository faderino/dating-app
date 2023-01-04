import React from 'react';
import styled from 'styled-components';
import colors from '../../../../styles/colors';

export const Chip = styled.div`
  font-weight: 700;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  display: inline-block;
  border-radius: 0.25rem;
`;

const Available = styled(Chip)`
  background-color: ${colors.green20};
  color: ${colors.green40};
`;

const Unvailable = styled(Chip)`
  background-color: ${colors.gray20};
  color: ${colors.gray40};
`;

type Props = {
  available?: boolean;
};

const StatusChip: React.FC<Props> = ({ available }) => {
  if (available) {
    return <Available>AVAILABLE</Available>;
  }
  return <Unvailable>UNAVAILABLE</Unvailable>;
};

export default StatusChip;
