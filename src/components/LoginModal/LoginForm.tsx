import React, { useEffect, useRef, useState } from 'react';
import { MdEmail, MdLock } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { LoginRequest, useLoginMutation } from '../../services/auth';
import { isEmail, isEmpty } from '../../utils/validation';
import { PrimaryButton } from '../Button';
import InputField from '../InputField/InputField';

const LoginButton = styled(PrimaryButton)`
  margin-top: 2rem;
  padding: 0.8rem 0;
  font-size: 1.25rem;
`;

const LoginForm: React.FC = () => {
  const emailInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState<LoginRequest>({ email: '', password: '' });
  const [errors, setErrors] = useState({} as typeof data);
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    emailInputRef.current.focus();
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
      navigate(location.state?.from?.pathname || '/app', { replace: true });
    } catch (error: any) {
      toast.error(error.data.message, {
        theme: 'colored',
      });
      setData({ ...data, password: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        ref={emailInputRef}
        label="Email Address"
        placeholder="example@mail.com"
        type="text"
        name="email"
        value={data.email}
        error={errors.email}
        prepend={<MdEmail size={28} />}
        onChange={handleChange}
      />
      <InputField
        label="Password"
        placeholder="example p@ssw0rd"
        type="password"
        name="password"
        value={data.password}
        error={errors.password}
        prepend={<MdLock size={28} />}
        onChange={handleChange}
      />
      <LoginButton block>{isLoading ? 'Logging in...' : 'Log in'}</LoginButton>
    </form>
  );
};

export default LoginForm;
