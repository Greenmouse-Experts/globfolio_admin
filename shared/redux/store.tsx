"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Reducer } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { RESET_APP_STATE_ACTION_TYPE } from "./actions/resetState";
import userReducer from "./reducers/userSlice";
import chatReducer from "./reducers/ChatSlice";
import { apiSlice } from "@/services/apiSlice";

const reducers = {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
    chat: chatReducer
}

const persistConfig = {
    key: "rootpal",
    storage: storage,
    whitelist: ["user"],
  };
  const combinedReducer = combineReducers<typeof reducers>(reducers);

  export const rootReducer: Reducer<RootState> = (state, action) => {
    if (action.type === RESET_APP_STATE_ACTION_TYPE) {
      state = {} as RootState;
    }
    return combinedReducer(state, action);
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat([
        // add middlewares here
        apiSlice.middleware,
      ]),
  });
  
  export const persistor = persistStore(store);
  export type AppDispatch = typeof store.dispatch;
  export type RootState = ReturnType<typeof combinedReducer>;
  export const useAppDispatch = () => useDispatch<AppDispatch>();
  export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  