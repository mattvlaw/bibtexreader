import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import {displayEntryIdReducer, entriesReducer} from '../features/entries/entrySlice';
import logger from 'redux-logger'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    displayEntryId: displayEntryIdReducer,
    entries: entriesReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
