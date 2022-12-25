import React, { useEffect, useRef, useState } from 'react';
import { MdPersonSearch } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { ContinueButton } from './RegisterForm';
import {
  changeData,
  nextStep,
  selectFormData,
} from '../../store/registerForm/registerFormSlice';
import { isEmpty } from '../../utils/validation';
import TextArea from '../../components/TextArea';

const BioForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const formData = useAppSelector(selectFormData);
  const [error, setError] = useState({} as Partial<typeof formData>);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    dispatch(changeData({ [e.target.name]: e.target.value }));
  };

  const validateForm = (): boolean => {
    setError({ bio: '' });
    const currentError = {} as typeof error;
    if (isEmpty(formData.bio)) {
      currentError.bio = 'Write something about yourself';
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
      <h1>About myself</h1>
      <TextArea
        ref={inputRef}
        placeholder="Example bio..."
        type="text"
        name="bio"
        value={formData.bio}
        error={error.bio}
        hint="Write something about yourself"
        prepend={<MdPersonSearch size={28} />}
        onChange={handleChange}
      />
      <ContinueButton block>CONTINUE</ContinueButton>
    </form>
  );
};

export default BioForm;
