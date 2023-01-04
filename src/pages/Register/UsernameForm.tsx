import React, { useEffect, useRef, useState } from 'react';
import { MdPerson } from 'react-icons/md';
import { ContinueButton } from '../../components/Button/ContinueButton';
import InputField from '../../components/InputField/InputField';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import {
  changeData,
  nextStep,
  selectFormData,
} from '../../store/registerForm/registerFormSlice';
import { isEmpty } from '../../utils/validation';

const UsernameForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const formData = useAppSelector(selectFormData);
  const [error, setError] = useState({} as Partial<typeof formData>);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(changeData({ [e.target.name]: e.target.value }));
  };

  const validateForm = (): boolean => {
    setError({ name: '' });
    const currentError = {} as typeof error;
    if (isEmpty(formData.name)) {
      currentError.name = 'Please enter your name';
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

  return (
    <form onSubmit={handleContinue}>
      <h1>My first name is</h1>
      <InputField
        ref={inputRef}
        placeholder="Example Name"
        type="text"
        name="name"
        value={formData.name}
        error={error.name}
        hint="This is how it will apear in Digidate"
        prepend={<MdPerson size={28} />}
        onChange={handleChange}
      />
      <ContinueButton block>CONTINUE</ContinueButton>
    </form>
  );
};

export default UsernameForm;
