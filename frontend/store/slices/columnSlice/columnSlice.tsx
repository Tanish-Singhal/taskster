import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Column {
  _id: string;
  name: string;
  boardId: string;
  tasks: string[];
}

interface ColumnState {
  columns: Column[];
  error: string | null;
}

const initialState: ColumnState = {
  columns: [],
  error: null,
};

export const fetchColumn = createAsyncThunk("column/fetchColumn", async (boardId: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/v1/columns/${boardId}`,
    {
      headers: {
        Authorization: localStorage.getItem("taskster-token"),
      },
    }
  );
  return response.data.data;
});

const columnSlice = createSlice({
  name: "column",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchColumn.fulfilled, (state, action) => {
        state.columns = action.payload;
        state.error = null;
      })
      .addCase(fetchColumn.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default columnSlice.reducer;
