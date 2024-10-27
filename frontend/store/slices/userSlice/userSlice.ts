import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  user: { username: string; email: string; } | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  initialized: false,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/v1/auth/me`,
    {
      headers: {
        Authorization: localStorage.getItem("taskster-token"),
      },
    }
  );
  return response.data.user;
});

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  await axios.get(`${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/v1/auth/logout`, {
    headers: {
      Authorization: localStorage.getItem("taskster-token"),
    },
  });
  localStorage.removeItem("taskster-token");
  return null;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        state.initialized = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.error = "Failed to fetch user data";
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.initialized = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
