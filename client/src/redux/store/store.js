import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authReducer } from "../features/authSlice";
import userReduser from "../features/userSlice";

const authPersistConfig = {
  key: "auth",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(authPersistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    persistedReducer,
    user: userReduser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persister = persistStore(store);
