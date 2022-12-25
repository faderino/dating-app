import React, { useRef, useState } from 'react';
import { MdEmail, MdLock } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import InputField from '../../components/InputField/InputField';
import { Logo } from '../../components/Logo';
import { ModalProps } from '../../components/Modal';
import Modal from '../../components/Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import {
  changeData,
  selectFormData,
} from '../../store/registerForm/registerFormSlice';
import colors from '../../styles/colors';
import { isEmail, isEmpty } from '../../utils/validation';
import { ContinueButton } from './RegisterForm';

const Container = styled.div`
  text-align: center;
  @media screen and (min-width: 896px) {
    padding: 0 5rem 2rem 5rem;
  }
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  font-style: italic;
  margin: 4rem 0 0.5rem 0;
  font-family: 'Atyp Display';
`;

const Info = styled.p`
  color: ${colors.textSecondary};
  margin-bottom: 2rem;
`;

const FormContainer = styled.div`
  max-width: 450px;
  margin: 0 auto;
`;

const RegisterModal: React.FC<ModalProps> = ({ show, closeModal }) => {
  return (
    <Modal show={show} closeModal={closeModal}>
      <Container>
        <Logo color={colors.primary} size={1.2} />
        <Title>Create Account</Title>
        <Info>
          Please enter your <b>email</b> and create a <b>password</b> to get
          started.
        </Info>
        <FormContainer>
          <CreateAccountForm />
        </FormContainer>
      </Container>
    </Modal>
  );
};

export default RegisterModal;

const CreateAccountForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formData = useAppSelector(selectFormData);
  const emailInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [errors, setErrors] = useState({} as Partial<typeof formData>);
  const [loading, setLoading] = useState(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(changeData({ [e.target.name]: e.target.value }));
  };

  const validateForm = (): boolean => {
    setErrors({ email: '', password: '' });
    const currentErrors = {} as typeof errors;
    if (!isEmail(formData.email)) {
      currentErrors.email = 'Invalid email';
    }
    if (isEmpty(formData.email)) {
      currentErrors.email = 'Please enter your email';
    }
    if (isEmpty(formData.password)) {
      currentErrors.password = 'Create a password, minimum 8 characters';
    }
    setErrors(currentErrors);
    return Boolean(Object.keys(currentErrors).length === 0);
  };

  const handleContinue: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const valid = validateForm();
    if (!valid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/register');
    }, 500);
  };

  return (
    <form onSubmit={handleContinue}>
      <InputField
        ref={emailInputRef}
        label="Email Address"
        placeholder="example@mail.com"
        type="text"
        name="email"
        value={formData.email}
        error={errors.email}
        prepend={<MdEmail size={28} />}
        onChange={handleChange}
      />
      <InputField
        label="Password"
        placeholder="example p@ssw0rd"
        type="password"
        name="password"
        value={formData.password}
        error={errors.password}
        prepend={<MdLock size={28} />}
        onChange={handleChange}
      />
      <ContinueButton block>
        {loading ? 'Processing...' : 'CONTINUE'}
      </ContinueButton>
    </form>
  );
};
