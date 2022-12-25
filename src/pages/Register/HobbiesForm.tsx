import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { ContinueButton } from './RegisterForm';
import {
  changeData,
  nextStep,
  selectFormData,
} from '../../store/registerForm/registerFormSlice';
import styled from 'styled-components';
import colors from '../../styles/colors';
import { useGetHobbiesQuery } from '../../services/hobbies';
import HobbyBadge from '../../components/HobbyBadge';

const FormTitle = styled.h1`
  margin-bottom: 1rem;
`;

const FormInfo = styled.p`
  color: ${colors.textSecondary};
  font-size: 0.9rem;
  margin-bottom: 3rem;
`;

const ErrorText = styled.p`
  color: ${colors.red50};
  font-size: 0.9rem;
  margin: -2rem 0 2rem 0;
`;

const HobbiesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding-bottom: 8rem;
`;

const ContinueBtnContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 1rem;
  max-width: 450px;
  margin: 0 auto;
`;

const HobbiesForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const formData = useAppSelector(selectFormData);
  const [error, setError] = useState({} as { hobby_ids: string });
  const { data: hobbies } = useGetHobbiesQuery();

  const validateForm = (): boolean => {
    setError({ hobby_ids: '' });
    const currentError = {} as typeof error;
    if (formData.hobby_ids.length === 0) {
      currentError.hobby_ids = 'Pick atleast 1 hobby';
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

  const selectHobby = (hobbyId: number) => {
    dispatch(changeData({ hobby_ids: [...formData.hobby_ids, hobbyId] }));
  };

  const unselectHobby = (hobbyId: number) => {
    dispatch(
      changeData({
        hobby_ids: formData.hobby_ids.filter((id) => id !== hobbyId),
      }),
    );
  };

  const isSelected = (hobbyId: number) =>
    formData.hobby_ids.some((id) => id === hobbyId);

  return (
    <form onSubmit={handleContinue}>
      <FormTitle>Hobbies</FormTitle>
      <FormInfo>
        Let everyone know what you&apos;re passionate about by adding it to your
        profile
      </FormInfo>
      {error.hobby_ids && <ErrorText>{error.hobby_ids}</ErrorText>}
      <HobbiesContainer>
        {hobbies?.data?.map((hobby) => (
          <HobbyBadge
            key={hobby.hobby_id}
            hobby={hobby}
            onClick={isSelected(hobby.hobby_id) ? unselectHobby : selectHobby}
            active={isSelected(hobby.hobby_id)}
          />
        ))}
      </HobbiesContainer>
      <ContinueBtnContainer>
        <ContinueButton block>CONTINUE</ContinueButton>
      </ContinueBtnContainer>
    </form>
  );
};

export default HobbiesForm;
