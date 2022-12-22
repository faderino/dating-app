import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  authenticated: boolean;
  user: any; // TODO: create user type
}

const initialState: AuthState = {
  authenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export default authSlice.reducer;
