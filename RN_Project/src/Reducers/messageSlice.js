import {createSlice} from '@reduxjs/toolkit';

export const messageSlice = createSlice({
  name: 'message',
  initialState: {usersList: ''},
  reducers: {
    setUserList: (state, action) => {
      state.UserList = action.payload;
    },
  },
});

export const {setUserList} = messageSlice.actions;
export default messageSlice.reducer;
