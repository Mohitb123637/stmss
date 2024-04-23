// Redux Store Configuration
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/authSlice';
import { injectStore } from '../utils/axiosConfig';
import subReducer from './subject/subSlice';
// import chapReducer from './chapter/chapSlice';
import topicReducer from './topic/topicSlice';
import examReducer from './ai/aiQuizSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  subjects: subReducer,
  //   chapters: chapReducer,
  topics: topicReducer,
  exams: examReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);
injectStore(store);

export { store, persistor };
