import React from 'react';
import { MdLocationOn } from 'react-icons/md';
import { HiOfficeBuilding } from 'react-icons/hi';
import styled from 'styled-components';
import { Venue } from '../../services/meetup.service';
import colors from '../../styles/colors';

const VenueCardContainer = styled.div<Pick<Props, 'active'>>`
  border-radius: 0.5rem;
  border: ${(props) =>
    props.active ? `3px solid ${colors.text}` : `1px solid ${colors.gray20}`};
  padding: 1rem;
  position: relative;
  cursor: pointer;
  :hover {
    box-shadow: 8px 10px 16px rgba(0, 0, 0, 0.05);
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Address = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  color: ${colors.textSecondary};
  p {
    font-size: 0.9rem;
  }
  span {
    font-weight: 500;
  }
`;

const Recommended = styled.div`
  display: inline-block;
  position: absolute;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  text-transform: uppercase;
  font-size: 0.7rem;
  font-weight: 500;
  background-color: ${colors.red10};
  color: ${colors.primary};
  right: 0;
  top: 0;
`;

type Props = {
  venue?: Venue;
  onClick: () => void;
  recommended?: boolean;
  active?: boolean;
};

const VenueCard: React.FC<Props> = ({
  venue,
  onClick,
  recommended,
  active,
}) => {
  return (
    <VenueCardContainer onClick={onClick} active={active}>
      {recommended && <Recommended>RECOMMENDED</Recommended>}
      <Title>
        <HiOfficeBuilding size={24} />
        <h3>{venue?.name}</h3>
      </Title>
      <Address>
        <div>
          <MdLocationOn size={20} />
        </div>
        <div>
          <p>{venue?.address}</p>
          <span>{venue?.location.city}</span>
        </div>
      </Address>
    </VenueCardContainer>
  );
};

export default VenueCard;
