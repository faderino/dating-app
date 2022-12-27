import React, { useEffect, useRef, useState } from 'react';
import { MdDateRange } from 'react-icons/md';
import InputField from '../../components/InputField/InputField';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { ContinueButton } from '../../components/Button/ContinueButton';
import {
  changeData,
  nextStep,
  selectFormData,
} from '../../store/registerForm/registerFormSlice';
import { isEmpty } from '../../utils/validation';
import { getAge } from '../../utils/date';

const BirthdateForm: React.FC = () => {
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
    setError({ birthdate: '' });
    const currentError = {} as typeof error;
    if (getAge(formData.birthdate) < 17) {
      currentError.birthdate =
        'You must be older than 17 years old to continue';
    }
    if (isEmpty(formData.birthdate)) {
      currentError.birthdate = 'Please enter your birthday';
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
      <h1>My birthday is</h1>
      <InputField
        ref={inputRef}
        placeholder="example@mail.com"
        type="date"
        name="birthdate"
        value={formData.birthdate}
        error={error.birthdate}
        hint="Your age will be public"
        prepend={<MdDateRange size={28} />}
        onChange={handleChange}
      />
      <ContinueButton block>CONTINUE</ContinueButton>
    </form>
  );
};

export default BirthdateForm;
