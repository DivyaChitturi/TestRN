import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {isLoggedIn: false},
  reducers: {
    signIn: (state, action) => {
      console.log('Login', state);
      state.isLoggedIn = action.payload;
    },
    signOut: state => {
      state.isLoggedIn = false;
    },
  },
});

export const {signIn, signOut} = userSlice.actions;
export const selectUser = state => state.user.isLoggedIn;
export default userSlice.reducer;
