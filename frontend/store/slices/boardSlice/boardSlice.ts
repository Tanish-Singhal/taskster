import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Board {
  id: string;
  name: string;
}

interface BoardState {
  boards: Board[];
  loading: boolean;
  error: string | null;
}

const initialState: BoardState = {
  boards: [],
  loading: false,
  error: null,
}

export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/v1/boards`, {
      headers: {
        Authorization: localStorage.getItem("taskster-token"),
      },
    });

    return response.data.data;
  } catch (err) {
    return "Failed to fetch boards data, Please refresh the page";
  }
});

const bordSlice = createSlice({ 
  name: "boards",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(fetchBoards.fulfilled, (state, action: PayloadAction<Board[]>) => {
      state.loading = false;
      state.boards = action.payload;
    })
    builder.addCase(fetchBoards.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
  }
});

export default bordSlice.reducer;
