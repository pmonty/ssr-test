import {
  Action,
  ThunkAction,
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";

import appSlice from "./slice";

// const app = combineReducers({ app: appSlice });

export default function initStore(preloadedState?: any) {
  return configureStore({
    reducer: appSlice,
    preloadedState: preloadedState,
  });
}

// export type RootState = ReturnType<typeof store.getState>;
