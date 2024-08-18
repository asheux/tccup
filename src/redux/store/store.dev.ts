import _ from "lodash";
import { configureStore } from "@reduxjs/toolkit";
import { batchedSubscribe } from "redux-batched-subscribe";

import rootReducer from "../reducers";
import initState from "src/redux/reducers/initState";

const debounceNotify = _.debounce((notify) => notify());

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  preloadedState: initState.payload,
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers({
      autoBatch: false,
    }).concat(batchedSubscribe(debounceNotify)),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
