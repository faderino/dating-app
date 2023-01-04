import React from 'react';
import styled, { css } from 'styled-components';
import colors from '../../styles/colors';

export const ButtonOverlay = styled.span`
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
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  ...props
}) => {
  return (
    <ButtonContainer disabled={disabled} {...props}>
      {children}
      <ButtonOverlay />
    </ButtonContainer>
  );
};

export const PrimaryButton = styled(Button)<Partial<ButtonProps>>`
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

export const CircleButton = styled(Button)`
  border-radius: 999px;
  padding: 1rem;
  aspect-ratio: 1;
  box-shadow: 1px 2px 2px 1px rgba(0, 0, 0, 0.26);
`;
