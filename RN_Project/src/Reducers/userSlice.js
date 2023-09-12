import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {isLoggedIn: false, userID: ''},
  reducers: {
    signIn: (state, action) => {
      console.log('Login', state);
      state.isLoggedIn = action.payload;
      state.userID = action.payload;
      console.log(state.userID);
    },
    signOut: state => {
      state.isLoggedIn = false;
      state.userID = '';
    },
  },
});

export const {signIn, signOut} = userSlice.actions;
export const selectUser = state => state.user.isLoggedIn;
export default userSlice.reducer;
