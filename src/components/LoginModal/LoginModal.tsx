import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import InputField from '../InputField/InputField';
import { Logo } from '../Logo';
import Modal, { ModalProps } from '../Modal/Modal';
import { MdEmail, MdLock } from 'react-icons/md';
import { PrimaryButton } from '../Button';

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

const LoginModal: React.FC<ModalProps> = ({ closeModal }) => {
  const emailInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [data, setData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({} as typeof data);

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const isEmail = (email: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const validateForm = () => {
    setErrors({ email: '', password: '' });
    const currentErrors = {} as typeof errors;
    if (!isEmail(data.email)) {
      currentErrors.email = 'Invalid email';
    }
    if (!data.email) {
      currentErrors.email = 'Please enter your email';
    }
    if (!data.password) {
      currentErrors.password = 'Please enter your password';
    }
    return currentErrors;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setErrors(validateForm());
    if (!Object.keys(errors).length) return;

    console.log(data);
  };

  return (
    <Modal closeModal={closeModal}>
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
          <LoginButton block>Log in</LoginButton>
        </form>
      </Container>
    </Modal>
  );
};

export default LoginModal;
