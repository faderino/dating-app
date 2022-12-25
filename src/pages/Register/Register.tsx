import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store';
import { selectFormData } from '../../store/registerForm/registerFormSlice';
import RegisterForm from './RegisterForm';

const Register: React.FC = () => {
  const { email, password } = useAppSelector(selectFormData);

  if (!email || !password) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default Register;
