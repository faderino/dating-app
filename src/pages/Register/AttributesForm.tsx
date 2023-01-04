import React, { useEffect, useRef, useState } from 'react';
import { MdHeight, MdMonitorWeight } from 'react-icons/md';
import InputField from '../../components/InputField/InputField';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { ContinueButton } from '../../components/Button/ContinueButton';
import {
  changeData,
  nextStep,
  selectFormData,
} from '../../store/registerForm/registerFormSlice';
import { isEmpty } from '../../utils/validation';

const AttributesForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const formData = useAppSelector(selectFormData);
  const [error, setError] = useState({} as { height: string; weight: string });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(changeData({ [e.target.name]: e.target.value }));
  };

  const validateForm = (): boolean => {
    setError({ height: '', weight: '' });
    const currentError = {} as typeof error;
    if (isEmpty(formData.height)) {
      currentError.height = 'Please enter your height';
    }
    if (isEmpty(formData.weight)) {
      currentError.weight = 'Please enter your weight';
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
      <h1>My attributes are</h1>
      <InputField
        ref={inputRef}
        placeholder="Height"
        type="number"
        name="height"
        value={formData.height ?? ''}
        error={error.height}
        hint="Your height in centimeters (cm)."
        prepend={<MdHeight size={28} />}
        append="cm"
        onChange={handleChange}
      />
      <InputField
        placeholder="Weight"
        type="number"
        name="weight"
        value={formData.weight ?? ''}
        error={error.weight}
        hint="Your height in kilograms (kg)."
        prepend={<MdMonitorWeight size={28} />}
        append="kg"
        onChange={handleChange}
      />
      <ContinueButton block>CONTINUE</ContinueButton>
    </form>
  );
};

export default AttributesForm;
