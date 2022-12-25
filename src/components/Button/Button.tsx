import React from 'react';
import styled, { css } from 'styled-components';
import colors from '../../styles/colors';

const ButtonOverlay = styled.span`
  background-color: ${colors.buttonOverlay};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
`;

const ButtonContainer = styled.button<Pick<ButtonProps, 'block'>>`
  cursor: pointer;
  position: relative;
  font-weight: 600;
  border: none;
  font-weight: 600;
  border-radius: 25px;
  padding: 0.5rem 1rem;
  overflow: hidden;
  :hover > ${ButtonOverlay} {
    opacity: 1;
  }
  ${(props) =>
    props.block &&
    css`
      width: 100%;
    `}
`;

type ButtonProps = {
  children?: React.ReactNode;
  outlined?: boolean;
  block?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <ButtonContainer {...props}>
      {children}
      <ButtonOverlay />
    </ButtonContainer>
  );
};

export const PrimaryButton = styled(Button)<Pick<ButtonProps, 'outlined'>>`
  background-image: ${colors.gradient};
  color: #fff;
`;

export const SecondaryButton = styled(Button)`
  color: ${colors.gray50};
  border: 2px solid ${colors.gray50};
  border-radius: 2rem;
  :hover > ${ButtonOverlay} {
    opacity: 0;
  }
  :hover,
  :focus {
    color: ${colors.primary};
    border-color: ${colors.primary};
  }
`;

export const SimpleButton = styled(Button)<Pick<ButtonProps, 'outlined'>>`
  background-color: ${(props) =>
    props.outlined ? 'transparent' : colors.white};
  ${(props) =>
    props.outlined &&
    css`
      color: ${colors.white};
      border: 2px solid ${colors.white};
    `}
`;
