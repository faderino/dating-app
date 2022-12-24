import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { authApi } from '../../services/auth';

export interface AuthState {
  user: any | null; // TODO: create user type
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, action: any) => {
          state.token = action.payload.data.auth_token;
          state.isAuthenticated = true;
        },
      )
      .addMatcher(authApi.endpoints.login.matchRejected, (_, action) => {
        console.log('rejected', action);
      });
  },
});

export const { logout } = authSlice.actions;

export const selectUser = (state: RootState): AuthState['user'] =>
  state.auth.user;
export const selectToken = (state: RootState): AuthState['token'] =>
  state.auth.token;

export default authSlice.reducer;
