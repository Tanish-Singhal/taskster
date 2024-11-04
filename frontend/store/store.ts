import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./slices/boardSlice/boardSlice"
import userReducer from "./slices/userSlice/userSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      board: boardReducer,
      user: userReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
