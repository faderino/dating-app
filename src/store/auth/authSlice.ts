import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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

export const TOKEN_KEY = 'accessToken';
const token = localStorage.getItem(TOKEN_KEY) || null;
const initialState: AuthState = {
  user: null,
  token: token,
  isAuthenticated: Boolean(token),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ token: string; user: LoggedInUser }>,
    ) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      localStorage.setItem(TOKEN_KEY, action.payload.token);
    },
    logout: (state) => {
      localStorage.removeItem(TOKEN_KEY);
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        const token = action.payload.data.auth_token;
        state.token = token;
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
        localStorage.setItem(TOKEN_KEY, token);
      })
      .addMatcher(authApi.endpoints.getUser.matchFulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { setAuth, logout } = authSlice.actions;

export const selectAuthState = (state: RootState): AuthState => state.auth;
export const selectIsAuthenticated = (
  state: RootState,
): AuthState['isAuthenticated'] => state.auth.isAuthenticated;
export const selectToken = (state: RootState): AuthState['token'] =>
  state.auth.token;

export default authSlice.reducer;
