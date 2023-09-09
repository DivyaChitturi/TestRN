import {configureStore} from '@reduxjs/toolkit';
import userSlice from './src/Reducers/userSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
