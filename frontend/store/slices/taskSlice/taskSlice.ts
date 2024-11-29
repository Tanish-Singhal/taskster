import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { TaskSchema } from "@/lib/schema/taskSchema";
import axios from "axios";
import { formatNames } from "@/lib/utils";
import { Task } from "@/types";

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
      const formattedData = {
        ...data,
        title: formatNames(data.title),
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/v1/tasks/${columnId}`,
        formattedData,
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
        return Promise.reject(err.response.data.message);
      }
      toast.error("Failed to create task", {
        style: {
          borderRadius: "5px",
          background: "#262626",
          color: "#ffffff",
        },
      });
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
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ taskId, data }: { taskId: string; data: TaskSchema }) => {
    try {
      const formattedData = {
        ...data,
        title: formatNames(data.title),
      };

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/v1/tasks/${taskId}`,
        formattedData,
        {
          headers: {
            Authorization: `${localStorage.getItem("taskster-token")}`,
          },
        }
      );

      toast.success("Task updated successfully", {
        style: {
          borderRadius: "5px",
          background: "#262626",
          color: "#ffffff",
        },
      });

      return response.data.task;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return Promise.reject(err.response.data.message);
      }
      toast.error("Failed to update task", {
        style: {
          borderRadius: "5px",
          background: "#262626",
          color: "#ffffff",
        },
      });
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/v1/tasks/${taskId}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("taskster-token")}`,
          },
        }
      );

      toast.success("Task deleted successfully", {
        style: {
          borderRadius: "5px",
          background: "#262626",
          color: "#ffffff",
        },
      });

      return taskId;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return Promise.reject(err.response.data.message);
      }
      toast.error("Failed to delete task", {
        style: {
          borderRadius: "5px",
          background: "#262626",
          color: "#ffffff",
        },
      });
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
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        const newTasks = action.payload;
        const columnId = newTasks[0]?.columnId;
        
        state.tasks = state.tasks.filter(task => task.columnId !== columnId);
        state.tasks.push(...newTasks);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.error.message || "Failed to update task";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete task";
      });
  }
});

export default taskSlice.reducer;
