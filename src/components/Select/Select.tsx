import React, { useId } from 'react';
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

const StyledInput = styled.div<Pick<SelectProps, 'error'>>`
  ${(props) => css`
    display: flex;
    align-items: center;
    gap: 1rem;
    border: 2px solid ${props.error ? colors.red50 : colors.gray20};
    color: ${props.error ? colors.red50 : colors.gray30};
    border-radius: 0.6rem;
    padding: 0 1rem;
    background-color: ${colors.gray10};
    transition: all 0.3s ease;
    :hover,
    :focus-within {
      border-color: ${props.error ? colors.red50 : colors.gray50};
      color: ${props.error ? colors.red50 : colors.gray50};
    }
  `}
`;

const SelectInput = styled.select`
  border: none;
  background-color: inherit;
  font-size: 1rem;
  padding: 1rem 0;
  width: 100%;
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

type Option = {
  value: any;
  text: string;
};

type SelectProps = {
  options?: Option[];
  label?: string;
  placeholder?: string;
  defaultValue?: any;
  value?: any;
  type?: string;
  name?: string;
  error?: string;
  hint?: string;
  prepend?: React.ReactNode;
  append?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
};

const Select: React.FC<SelectProps> = ({
  options,
  label,
  prepend,
  append,
  error,
  hint,
  ...props
}) => {
  const inputId = useId();
  return (
    <Container>
      <Label htmlFor={inputId}>{label}</Label>
      <StyledInput error={error}>
        {prepend}
        <SelectInput id={inputId} {...props}>
          <option disabled value={0}>
            Select a city...
          </option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </SelectInput>
        {append}
      </StyledInput>
      {error && <ErrorText>{error}</ErrorText>}
      {!error && hint && <HintText>{hint}</HintText>}
    </Container>
  );
};

export default Select;
