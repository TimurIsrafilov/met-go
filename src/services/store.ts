import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import user from "./user";
import notes from "./notes";

export const combineReducer = combineReducers({
  user,
  notes,
});

export const makeStore = () => configureStore({ reducer: combineReducer });

export const wrapper = createWrapper(makeStore);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
