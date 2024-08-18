import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "../reducers";
import initState from "src/redux/reducers/initState";

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initState.payload,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
