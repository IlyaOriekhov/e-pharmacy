import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { pharmacyReducer } from "./pharmacy/slice";
import { authReducer } from "./auth/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "accessToken", "refreshToken", "isLoggedIn"],
};

const pharmacyPersistConfig = {
  key: "pharmacy",
  storage,
};

const rootReducer = {
  auth: persistReducer(authPersistConfig, authReducer),
  pharmacy: persistReducer(pharmacyPersistConfig, pharmacyReducer),
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
