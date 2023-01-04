import React, { forwardRef, useId } from 'react';
import styled, { css } from 'styled-components';
import colors from '../../styles/colors';

const Container = styled.div`
  margin-bottom: 1.5rem;
  text-align: left;
`;

const Label = styled.label`
  font-weight: 500;
  display: block;
  margin-bottom: 0.75rem;
`;

const StyledInput = styled.div<Pick<InputFieldProps, 'error'>>`
  ${(props) => css`
    display: flex;
    gap: 1rem;
    border: 2px solid ${props.error ? colors.red50 : colors.gray20};
    color: ${props.error ? colors.red50 : colors.gray30};
    border-radius: 0.6rem;
    padding: 0.5rem 1rem;
    background-color: ${colors.gray10};
    transition: all 0.3s ease;
    :hover,
    :focus-within {
      border-color: ${props.error ? colors.red50 : colors.gray50};
      color: ${props.error ? colors.red50 : colors.gray50};
    }
  `}
`;

const TextAreaInput = styled.textarea`
  border: none;
  background-color: inherit;
  font-size: 1rem;
  line-height: 1.5;
  width: 100%;
  resize: none;
  :focus {
    outline: none;
  }
`;

const ErrorText = styled.p`
  color: ${colors.red50};
  font-style: italic;
  font-size: 0.9rem;
`;

const HintText = styled.p`
  color: ${colors.textSecondary};
  font-size: 0.9rem;
`;

type InputFieldProps = {
  label?: string;
  placeholder?: string;
  value?: any;
  type?: string;
  name?: string;
  error?: string;
  hint?: string;
  prepend?: React.ReactNode;
  append?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  rows?: number;
};

const TextArea = forwardRef<HTMLTextAreaElement, InputFieldProps>(
  ({ label, prepend, append, error, hint, rows, ...props }, ref) => {
    const inputId = useId();
    return (
      <Container>
        <Label htmlFor={inputId}>{label}</Label>
        <StyledInput error={error}>
          {prepend}
          <TextAreaInput id={inputId} ref={ref} {...props} rows={rows ?? 7} />
          {append}
        </StyledInput>
        {error && <ErrorText>{error}</ErrorText>}
        {!error && hint && <HintText>{hint}</HintText>}
      </Container>
    );
  },
);
TextArea.displayName = 'TextArea';

export default TextArea;
