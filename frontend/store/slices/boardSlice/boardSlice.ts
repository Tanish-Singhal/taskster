import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

interface Board {
  _id: string;
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
};

export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/v1/boards`, {
      headers: {
        Authorization: localStorage.getItem("taskster-token"),
      },
    });

    return response.data.data;
  } catch (err) {
    return "Failed to fetch boards data, please refresh the page";
  }
});

export const deleteBoard = createAsyncThunk("boards/deleteBoard", async (boardId: string) => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/v1/boards/${boardId}`, {
      headers: {
        Authorization: localStorage.getItem("taskster-token"),
      },
    });

    toast.success("Board deleted successfully!", {
      style: {
        borderRadius: "5px",
        background: "#262626",
        color: "#ffffff",
      },
    });

    return boardId;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      toast.error(err.response.data.message, {
        style: {
          borderRadius: "10px",
          background: "#171717",
          color: "#ffffff",
        },
      });
    } else {
      toast.error("Failed to delete board", {
        style: {
          borderRadius: "10px",
          background: "#171717",
          color: "#ffffff",
        },
      });
    }

    return "Failed to delete board";
  }
});

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBoards.fulfilled, (state, action: PayloadAction<Board[]>) => {
      state.loading = false;
      state.boards = action.payload;
    });
    builder.addCase(fetchBoards.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "An error occurred";
    });
    builder.addCase(deleteBoard.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteBoard.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.boards = state.boards.filter((board) => board._id !== action.payload);
    });
    builder.addCase(deleteBoard.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "An error occurred";
    });
  },
});

export default boardSlice.reducer;
