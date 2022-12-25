import React from 'react';
import styled from 'styled-components';
import { PrimaryButton } from '../../components/Button';
import MultiStepForm from '../../components/MultiStepForm/MultiStepForm';
import BirthdateForm from './BirthdateForm';
import UsernameForm from './UsernameForm';

export const ContinueButton = styled(PrimaryButton)`
  margin-top: 2rem;
  padding: 1.2rem 0;
  font-size: 1rem;
`;

const RegisterForm: React.FC = () => {
  const forms = [<UsernameForm key={0} />, <BirthdateForm key={1} />];

  return (
    <div>
      <MultiStepForm forms={forms} />
    </div>
  );
};

export default RegisterForm;
