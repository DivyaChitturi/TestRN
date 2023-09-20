import {createSlice} from '@reduxjs/toolkit';

export const messageSlice = createSlice({
  name: 'message',
  initialState: {allMessages: []},
  reducers: {
    saveMessage: (state, action) => {
      return {
        ...state,
        allMessages: [...state.allMessages, action.payload],
      };
    },
    newMessage: (state, action) => {
      return {
        ...state,
        allMessages: [...state.allMessages, action.payload],
      };
    },
  },
});

export const {saveMessage, newMessage} = messageSlice.actions;

export default messageSlice.reducer;
