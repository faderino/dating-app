import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import InputField from '../InputField/InputField';
import { Logo } from '../Logo';
import Modal, { ModalProps } from '../Modal/Modal';
import { MdEmail, MdLock } from 'react-icons/md';
import { PrimaryButton } from '../Button';
import { LoginRequest, useLoginMutation } from '../../services/auth';
import { isEmail, isEmpty } from '../../utils/validation';

const Container = styled.div`
  text-align: center;
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

const LoginButton = styled(PrimaryButton)`
  margin-top: 2rem;
  padding: 0.8rem 0;
  font-size: 1.25rem;
`;

const LoginModal: React.FC<ModalProps> = ({ show, closeModal }) => {
  const emailInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [data, setData] = useState<LoginRequest>({ email: '', password: '' });
  const [errors, setErrors] = useState({} as typeof data);
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (emailInputRef.current) emailInputRef.current.focus();
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = (): boolean => {
    setErrors({ email: '', password: '' });
    const currentErrors = {} as typeof errors;
    if (!isEmail(data.email)) {
      currentErrors.email = 'Invalid email';
    }
    if (isEmpty(data.email)) {
      currentErrors.email = 'Please enter your email';
    }
    if (isEmpty(data.password)) {
      currentErrors.password = 'Please enter your password';
    }
    setErrors(currentErrors);
    return Boolean(Object.keys(currentErrors).length === 0);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const valid = validateForm();
    if (!valid) return;

    try {
      await login(data).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} closeModal={closeModal}>
      <Container>
        <Logo color={colors.primary} size={1.2} />
        <Title>Get Started</Title>
        <Info>Please enter below details to contine.</Info>
        <form onSubmit={handleSubmit}>
          <InputField
            ref={emailInputRef}
            label="Email Address"
            placeholder="example@mail.com"
            type="text"
            name="email"
            error={errors.email}
            prepend={<MdEmail size={28} />}
            onChange={handleChange}
          />
          <InputField
            label="Password"
            placeholder="example p@ssw0rd"
            type="password"
            name="password"
            error={errors.password}
            prepend={<MdLock size={28} />}
            onChange={handleChange}
          />
          <LoginButton block>
            {isLoading ? 'Logging in...' : 'Log in'}
          </LoginButton>
        </form>
      </Container>
    </Modal>
  );
};

export default LoginModal;
