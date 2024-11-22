import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./slices/boardSlice/boardSlice"
import userReducer from "./slices/userSlice/userSlice"
import columnReducer from "./slices/columnSlice/columnSlice"
import taskReducer from "./slices/taskSlice/taskSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      board: boardReducer,
      user: userReducer,
      column: columnReducer,
      task: taskReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
