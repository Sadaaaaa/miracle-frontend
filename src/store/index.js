import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './reducers/authentication';
import authReducer from './reducers/authReducer';
import imageReducer from './reducers/images';
import userReducer from './reducers/user';
import itemReducer from './reducers/item';

export default configureStore({
  reducer: {
    user: userReducer,
    image: imageReducer,
    auth: authReducer,
    authentication: authenticationReducer,
    item: itemReducer
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...(process.env.NODE_ENV !== 'production' ? [logger] : [])),
})