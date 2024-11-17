import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./slices/boardSlice/boardSlice"
import userReducer from "./slices/userSlice/userSlice"
import columnReducer from "./slices/columnSlice/columnSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      board: boardReducer,
      user: userReducer,
      column: columnReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
