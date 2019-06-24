import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducer from './reducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['selectedDate', 'where', 'gigs', 'spotifyToken']
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default persistedReducer;