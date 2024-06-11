import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userDetails from './userSlice';
import selectedChatDetails from './selectedChatSlice'
import chatDetails from './chatsSlice'

const rootReducer = combineReducers({
  userDetails,
  selectedChatDetails,
  chatDetails
});

export const store = configureStore({
  reducer: rootReducer,
});

