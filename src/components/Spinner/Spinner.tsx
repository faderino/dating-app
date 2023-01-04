import React from 'react';
import styled, { keyframes } from 'styled-components';
import colors from '../../styles/colors';

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.span<Props>`
  width: ${(props) => (props.size ? props.size : 1)}rem;
  height: ${(props) => (props.size ? props.size : 1)}rem;
  border: ${(props) => (props.thickness ? props.thickness : 2)}px solid
    ${colors.white};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: ${rotation} 1s linear infinite;
`;

type Props = {
  size?: number;
  thickness?: number;
};

const Spinner: React.FC<Props> = ({ size, thickness }) => {
  return <Loader size={size} thickness={thickness} />;
};

export default Spinner;
