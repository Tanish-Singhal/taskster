import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { TaskSchema } from "@/lib/schema/taskSchema";
import axios from "axios";
import { formatNames } from "@/lib/utils";

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
      const formattedData = {
        ...data,
        title: formatNames(data.title),
        description: data.description ? formatNames(data.description) : data.description
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
      return Promise.reject("Failed to create task");
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
  reducers: {
    clearColumnTasks: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.columnId !== action.payload);
    },
  },
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
        // Instead of replacing all tasks, merge them
        const newTasks = action.payload;
        const columnId = newTasks[0]?.columnId;
        
        state.tasks = state.tasks.filter(task => task.columnId !== columnId);
        state.tasks.push(...newTasks);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      });
  }
});

export const { clearColumnTasks } = taskSlice.actions;
export default taskSlice.reducer;
