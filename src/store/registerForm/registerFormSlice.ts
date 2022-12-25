import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface RegisterFormData {
  email: string;
  password: string;
  name: string;
  gender: number | null;
  birthdate: string;
  city_id: number | null;
  files: any[];
  captions: string[];
  hobby_ids: number[];
  height: number | null;
  weight: number | null;
  bio: string;
}

export interface RegisterFormState {
  step: number;
  formData: RegisterFormData;
}

const initialState: RegisterFormState = {
  step: 0,
  formData: {
    email: '',
    password: '',
    name: '',
    gender: null,
    birthdate: '',
    city_id: null,
    files: [],
    captions: [],
    hobby_ids: [],
    height: null,
    weight: null,
    bio: '',
  },
};

const registerFormSlice = createSlice({
  name: 'registerForm',
  initialState,
  reducers: {
    changeData: (state, action: PayloadAction<Partial<RegisterFormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
});

export const { changeData } = registerFormSlice.actions;

export const selectFormData = (
  state: RootState,
): RegisterFormState['formData'] => state.registerForm.formData;
export const selectStep = (state: RootState): RegisterFormState['step'] =>
  state.registerForm.step;

export default registerFormSlice.reducer;
