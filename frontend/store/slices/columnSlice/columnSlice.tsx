import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

interface Column {
  _id: string;
  name: string;
  boardId: string;
  tasks: string[];
}

interface ColumnState {
  columns: Column[];
  error: string | null;
  loading: boolean;
}

const initialState: ColumnState = {
  columns: [],
  error: null,
  loading: false,
};

export const fetchColumn = createAsyncThunk("column/fetchColumn", async (boardId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/v1/columns/${boardId}`,
      {
        headers: {
          Authorization: localStorage.getItem("taskster-token"),
        },
      }
    );
    return response.data.data;
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
      toast.error("Failed to delete column", {
        style: {
          borderRadius: "5px",
          background: "#262626",
          color: "#ffffff",
        },
      });
    }
  }
});

export const deleteColumn = createAsyncThunk(
  "column/deleteColumn",
  async (columnId: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/v1/columns/${columnId}`, {
        headers: {
          Authorization: localStorage.getItem("taskster-token"),
        },
      });

      toast.success("Column deleted successfully!", {
        style: {
          borderRadius: "5px",
          background: "#262626",
          color: "#ffffff",
        },
      });

      return columnId;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data.message, {
          style: {
            borderRadius: "5px",
            background: "#262626",
            color: "#ffffff",
          },
        });
      }
      else {
        toast.error("Failed to delete column", {
          style: {
            borderRadius: "5px",
            background: "#262626",
            color: "#ffffff",
          },
        });
      }
    }
  }
);

const columnSlice = createSlice({
  name: "column",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchColumn.fulfilled, (state, action) => {
        state.columns = action.payload || [];
        state.error = null;
      })
      .addCase(fetchColumn.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred";
        state.loading = true;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.columns = state.columns.filter((column) => column._id !== action.payload);
        state.error = null;
        state.loading = false;
      })
      .addCase(deleteColumn.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred";
        state.loading = false;
      });
  },
});

export default columnSlice.reducer;
