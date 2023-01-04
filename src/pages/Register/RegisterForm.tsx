import React from 'react';
import MultiStepForm from '../../components/MultiStepForm/MultiStepForm';
import AttributesForm from './AttributesForm';
import BioForm from './BioForm';
import BirthdateForm from './BirthdateForm';
import GenderForm from './GenderForm';
import HobbiesForm from './HobbiesForm';
import PhotosForm from './PhotosForm';
import UsernameForm from './UsernameForm';

const RegisterForm: React.FC = () => {
  const forms = [
    <UsernameForm key={0} />,
    <BirthdateForm key={1} />,
    <GenderForm key={2} />,
    <AttributesForm key={3} />,
    <BioForm key={4} />,
    <HobbiesForm key={5} />,
    <PhotosForm key={6} />,
  ];

  return <MultiStepForm forms={forms} />;
};

export default RegisterForm;
