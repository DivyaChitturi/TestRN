import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {isLoggedIn: false, userID: ''},
  reducers: {
    signIn: (state, action) => {
      console.log('Login', state);
      state.isLoggedIn = true;
    },
    setUserID: (state, action) => {
      state.isLoggedIn = true;
      state.userID = action.payload;
    },
    setUserList: (state, action) => {
      state.UserList = action.payload;
    },
    signOut: state => {
      state.isLoggedIn = false;
      state.userID = '';
      state.UserList = '';
    },
  },
});

export const {signIn, signOut, setUserID, setUserList} = userSlice.actions;
export const selectUser = state => state.user.isLoggedIn;
export default userSlice.reducer;
