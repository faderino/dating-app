import React from 'react';
import styled from 'styled-components';
import { PrimaryButton } from '../../components/Button';
import MultiStepForm from '../../components/MultiStepForm/MultiStepForm';
import UsernameForm from './UsernameForm';

export const ContinueButton = styled(PrimaryButton)`
  margin-top: 2rem;
  padding: 1.2rem 0;
  font-size: 1rem;
`;

const RegisterForm: React.FC = () => {
  return (
    <div>
      <MultiStepForm forms={[<UsernameForm key={0} />]} />
    </div>
  );
};

export default RegisterForm;
