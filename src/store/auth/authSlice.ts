import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { authApi } from '../../services/auth';

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const tokenKey = 'accessToken';
const token = localStorage.getItem(tokenKey) || null;
const initialState: AuthState = {
  token: token,
  isAuthenticated: Boolean(token),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem(tokenKey);
      window.location.reload();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        const token = action.payload.data.auth_token;
        state.token = token;
        state.isAuthenticated = true;
        localStorage.setItem(tokenKey, token);
      },
    );
  },
});

export const { logout } = authSlice.actions;

export const selectAuthState = (state: RootState): AuthState => state.auth;
export const selectIsAuthenticated = (
  state: RootState,
): AuthState['isAuthenticated'] => state.auth.isAuthenticated;
export const selectToken = (state: RootState): AuthState['token'] =>
  state.auth.token;

export default authSlice.reducer;
