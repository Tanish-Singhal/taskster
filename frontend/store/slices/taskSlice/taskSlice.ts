import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { TaskSchema } from "@/lib/schema/taskSchema";
import axios from "axios";

interface Task {
  _id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  tags: string[];
  deadline?: string;
  columnId: string;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
}

export const createTask = createAsyncThunk(
  "task/createTask", 
  async ({data, columnId}: {data: TaskSchema, columnId: string}) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/v1/tasks/${columnId}`,
        data,
        {
          headers: {
            Authorization: `${localStorage.getItem("taskster-token")}`,
          },
        }
      );

      toast.success("Task created successfully", {
        style: {
          borderRadius: "5px",
          background: "#262626",
          color: "#ffffff",
        },
      });

      return response.data.task;
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
        toast.error("Failed to create task", {
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

export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async (columnId: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/v1/tasks/${columnId}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("taskster-token")}`,
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
        toast.error("Failed to fetch tasks", {
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

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create task";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      });
  }
});

export default taskSlice.reducer;
