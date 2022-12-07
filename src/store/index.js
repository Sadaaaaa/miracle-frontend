import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import imageReducer from './reducers/images';
import logger from 'redux-logger';
import authReducer from './reducers/authReducer';
import authenticationReducer from './reducers/authentication';

export default configureStore({
  reducer: {
    user: userReducer,
    image: imageReducer,
    auth: authReducer,
    authentication: authenticationReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...(process.env.NODE_ENV !== 'production' ? [logger] : [])),
})