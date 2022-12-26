import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { authApi } from '../../services/auth';

export interface LoggedInUser {
  user_id: number;
  email: string;
  role_id: number;
  role: string;
}

export interface AuthState {
  user: LoggedInUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

const tokenKey = 'accessToken';
const token = localStorage.getItem(tokenKey) || null;
const initialState: AuthState = {
  user: null,
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
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        const token = action.payload.data.auth_token;
        state.token = token;
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
        localStorage.setItem(tokenKey, token);
      })
      .addMatcher(authApi.endpoints.getUser.matchFulfilled, (state, action) => {
        state.user = action.payload.data;
      })
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, action) => {
          const token = action.payload.data.auth_token;
          state.token = token;
          state.isAuthenticated = true;
          state.user = {
            user_id: action.payload.data.user_id,
            email: action.payload.data.email,
            role_id: action.payload.data.role_id,
            role: action.payload.data.role,
          };
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
