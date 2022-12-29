import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { profileApi } from '../../services/profile';
import { Profile } from '../../types/profile';

export interface ProfileState {
  profile: Profile | null;
}

const initialState: ProfileState = {
  profile: null,
};

export const profileSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      profileApi.endpoints.getProfile.matchFulfilled,
      (state, action) => {
        state.profile = action.payload.profile;
      },
    );
  },
});

export const selectProfile = (state: RootState): ProfileState['profile'] =>
  state.profile.profile;

export default profileSlice.reducer;
