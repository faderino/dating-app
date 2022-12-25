import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { ContinueButton } from './RegisterForm';
import {
  changeData,
  nextStep,
  selectFormData,
} from '../../store/registerForm/registerFormSlice';
import { isEmpty } from '../../utils/validation';
import styled, { css } from 'styled-components';
import colors from '../../styles/colors';
import { SecondaryButton } from '../../components/Button';
import { Gender } from '../../types/profile';

const FormTitle = styled.h1`
  margin-bottom: 2rem;
`;

const GenderButton = styled(SecondaryButton)<{ active: boolean }>`
  padding: 1.2rem 0;
  margin-bottom: 1rem;
  ${(props) =>
    props.active &&
    css`
      color: ${colors.primary};
      border-width: 3px;
      border-color: ${colors.primary};
      font-weight: 700;
    `}
`;

const ErrorText = styled.p`
  text-align: center;
  font-style: italic;
  font-size: 0.9rem;
  color: ${colors.red50};
`;

const HintText = styled.p`
  font-size: 0.9rem;
  margin-top: 1rem;
  text-align: center;
  color: ${colors.textSecondary};
`;

const GenderForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const formData = useAppSelector(selectFormData);
  const [error, setError] = useState({} as { gender: string });
  const [chosenGender, setChosenGender] = useState<number | null>(
    formData.gender,
  );

  useEffect(() => {
    dispatch(changeData({ gender: chosenGender }));
  }, [chosenGender]);

  const validateForm = (): boolean => {
    setError({ gender: '' });
    const currentError = {} as typeof error;
    if (isEmpty(formData.gender)) {
      currentError.gender = 'Please select your gender';
    }
    setError(currentError);
    return Boolean(Object.keys(currentError).length === 0);
  };

  const handleContinue: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const valid = validateForm();
    if (!valid) return;
    dispatch(nextStep());
  };

  return (
    <form onSubmit={handleContinue}>
      <FormTitle>I am a</FormTitle>
      <GenderButton
        type="button"
        active={chosenGender === Gender.Male}
        block
        onClick={() => setChosenGender(Gender.Male)}
      >
        Man
      </GenderButton>
      <GenderButton
        type="button"
        active={chosenGender === Gender.Female}
        block
        onClick={() => setChosenGender(Gender.Female)}
      >
        Woman
      </GenderButton>
      {error.gender && <ErrorText>{error.gender}</ErrorText>}
      <HintText>Your gender will be shown your profile</HintText>
      <ContinueButton block>CONTINUE</ContinueButton>
    </form>
  );
};

export default GenderForm;
