import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import cartSlice from './slices/cartSlice';
import merchantSlice from './slices/merchantSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  cart: cartSlice,
  merchant: merchantSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store);
