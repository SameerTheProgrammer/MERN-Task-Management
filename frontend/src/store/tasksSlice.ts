// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { TaskData } from "../utils/types";
import { ColumnType } from "../utils/enums";

export interface TasksState {
  Progress: Array<TaskData>;
  "Under Review": Array<TaskData>;
  Completed: Array<TaskData>;
}

const initialState: TasksState = {
  Progress: [],
  "Under Review": [],
  Completed: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setAllTasks(state, action: PayloadAction<TasksState>) {
      state.Progress = action.payload.Progress;
      state["Under Review"] = action.payload["Under Review"];
      state.Completed = action.payload.Completed;
    },

    addTask(state, action: PayloadAction<TaskData>) {
      const task = action.payload;
      state[task.status].push(task);
    },

    updateTaskInfo(
      state,
      action: PayloadAction<{ id: string; updatedTask: Partial<TaskData> }>
    ) {
      const { id, updatedTask } = action.payload;
      Object.values(state).forEach((taskList) => {
        const index = taskList.findIndex((task) => task.id === id);
        if (index !== -1) {
          taskList[index] = { ...taskList[index], ...updatedTask };
        }
      });
    },

    updateTaskStatus(
      state,
      action: PayloadAction<{ id: string; newStatus: ColumnType }>
    ) {
      const { id, newStatus } = action.payload;
      let taskToUpdate: TaskData | undefined;

      Object.values(state).forEach((taskList) => {
        const index = taskList.findIndex((task) => task.id === id);
        if (index !== -1) {
          taskToUpdate = taskList[index];
          taskList.splice(index, 1);
        }
      });

      if (taskToUpdate) {
        taskToUpdate.status = newStatus;
        state[newStatus].push(taskToUpdate);
      }
    },

    deleteTask(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;

      Object.values(state).forEach((taskList) => {
        const index = taskList.findIndex((task) => task.id === id);
        if (index !== -1) {
          taskList.splice(index, 1);
        }
      });
    },
  },
});

export const {
  setAllTasks,
  addTask,
  updateTaskInfo,
  updateTaskStatus,
  deleteTask,
} = taskSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export default taskSlice.reducer;
