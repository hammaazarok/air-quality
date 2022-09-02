import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import citiesReducer from './cities/cities';

const store = configureStore({
  reducer: {
    cities: citiesReducer,
  },
},
applyMiddleware(thunk));

export default store;
