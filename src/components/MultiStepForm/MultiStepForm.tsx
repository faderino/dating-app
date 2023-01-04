import React from 'react';
import { MdArrowBackIosNew, MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import {
  previousStep,
  selectStep,
} from '../../store/registerForm/registerFormSlice';
import colors from '../../styles/colors';

const Container = styled.div`
  padding: 1rem;
  max-width: 500px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 1rem;
`;

const HeaderButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${colors.gray50};
  cursor: pointer;
  transition: color 0.3s ease;
  :hover {
    color: ${colors.text};
  }
`;

const FormContainer = styled.div`
  padding: 1rem;
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 0.75rem;
  width: ${(props) => props.progress}%;
  background-image: ${colors.gradient};
  transition: width 0.5s ease;
`;

type Props = {
  forms: React.ReactNode[];
};

const MultiStepForm: React.FC<Props> = ({ forms }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const step = useAppSelector(selectStep);

  return (
    <>
      <ProgressBar progress={(step / forms.length) * 100} />
      <Container>
        <Header>
          {step === 0 ? (
            <HeaderButton onClick={() => navigate('/')}>
              <MdClose size={28} />
            </HeaderButton>
          ) : (
            <HeaderButton onClick={() => dispatch(previousStep())}>
              <MdArrowBackIosNew size={28} />
            </HeaderButton>
          )}
        </Header>
        <FormContainer>{forms[step]}</FormContainer>
      </Container>
    </>
  );
};

export default MultiStepForm;
