import styled from 'styled-components';
import colors from '../../styles/colors';

export const Card = styled.div<{ img?: string }>`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: ${colors.black};
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  border-radius: 1rem;
  overflow: hidden;
`;

export const PhotoBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 0.5rem;
  width: 100%;
  position: absolute;
  top: 0.25rem;
  padding: 0.25rem 1.2rem;
  height: 0.75rem;
`;

export const PhotoBar = styled.div<{ active?: boolean }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    props.active ? colors.white : 'rgba(0,0,0,50%)'};
`;

export const CardContent = styled.div`
  color: ${colors.white};
  padding: 1rem;
  position: absolute;
  width: 100%;
  bottom: 0;
  background-image: linear-gradient(
    to top,
    rgb(0, 0, 0) 5%,
    rgba(255, 255, 255, 0) 100%
  );
`;

export const PhotoCaption = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  color: ${colors.text};
  background-color: rgba(255, 255, 255, 65%);
  padding: 0.5rem;
`;

export const NameAge = styled.h1`
  span {
    font-weight: 400;
    font-size: 1.65rem;
  }
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Bio = styled.div`
  padding: 0.8rem 0;
`;

export const InfoBtn = styled.button`
  color: ${colors.white};
  align-self: flex-end;
  margin-bottom: 0.5rem;
  display: flex;
  border: none;
  cursor: pointer;
  width: 2.75rem;
  :hover svg {
    transform: scale(1.05);
  }
`;

export const Overlay = styled.div`
  height: 80%;
  width: 50%;
  position: absolute;
`;

export const PreviousPhoto = styled(Overlay)`
  left: 0;
`;

export const NextPhoto = styled(Overlay)`
  right: 0;
`;
