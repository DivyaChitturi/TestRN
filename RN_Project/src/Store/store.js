import {configureStore} from '@reduxjs/toolkit';
import userSlice from '../Reducers/userSlice';
import messageSlice from '../Reducers/messageSlice';
import {createLogger} from 'redux-logger';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
  diff: true,
});

export default configureStore({
  reducer: {
    user: userSlice,
    message: messageSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});
