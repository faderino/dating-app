import styled from 'styled-components';
import { Content } from '../../components/Layout';
import SwipeCard from '../../components/SwipeCard';
import colors from '../../styles/colors';

export const PageContent = styled(Content)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 896px) {
    max-width: 500px;
    margin: 0 auto;
  }
`;

export const Stack = styled.div`
  width: 98%;
  height: 98%;
  margin: auto;
  position: relative;
`;

export const StackItem = styled(SwipeCard)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1rem 0;
`;

export const ActionButton = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 0.75rem;
  transition: transform 0.3s ease;
  :hover,
  :hover svg {
    transform: scale(1.075);
  }
`;

export const LikeButton = styled(ActionButton)`
  color: ${colors.primary};
  border: 2px solid ${colors.primary};
`;

export const SkipButton = styled(ActionButton)`
  color: ${colors.gray50};
  border: 2px solid ${colors.gray50};
`;
