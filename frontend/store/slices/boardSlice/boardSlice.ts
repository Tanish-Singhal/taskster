import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

interface Board {
  _id: string;
  name: string;
}

interface BoardState {
  boards: Board[];
  currentBoard: Board;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: BoardState = {
  boards: [],
  currentBoard: { _id: "", name: "" },
  loading: false,
  error: null,
  initialized: false,
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
          borderRadius: "5px",
          background: "#262626",
          color: "#ffffff",
        },
      });
    } else {
      toast.error("Failed to delete board", {
        style: {
          borderRadius: "5px",
          background: "#262626",
          color: "#ffffff",
        },
      });
    }

    return "Failed to delete board";
  }
});

export const renameBoard = createAsyncThunk(
  "boards/renameBoard",
  async ({ boardId, name }: { boardId: string; name: string }) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/v1/boards/${boardId}`,
        { name },
        {
          headers: {
            Authorization: localStorage.getItem("taskster-token"),
          },
        }
      );

      toast.success("Board renamed successfully!", {
        style: {
          borderRadius: "5px",
          background: "#262626",
          color: "#ffffff",
        },
      });

      return response.data.board;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data.message, {
          style: {
            borderRadius: "5px",
            background: "#262626",
            color: "#ffffff",
          },
        });
      } else {
        toast.error("Board name already exist", {
          style: {
            borderRadius: "5px",
            background: "#262626",
            color: "#ffffff",
          },
        });
      }
      throw err;
    }
  }
);

export const fetchBoardById = createAsyncThunk("boards/fetchBoardById", async (boardId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/v1/boards/${boardId}`,
      {
        headers: {
          Authorization: localStorage.getItem("taskster-token"),
        },
        
      }
    );
    return response.data.data;
  } catch (err) {
    throw new Error("Failed to fetch board name");
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
      state.initialized = true;
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
    builder.addCase(renameBoard.fulfilled, (state, action) => {
      const index = state.boards.findIndex((board) => board._id === action.payload._id);
      if (index !== -1) {
        state.boards[index].name = action.payload.name;
      }
    });
    builder.addCase(fetchBoardById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBoardById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentBoard = action.payload;
    });
    builder.addCase(fetchBoardById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "An error occurred";
    });
  },
});

export default boardSlice.reducer;
