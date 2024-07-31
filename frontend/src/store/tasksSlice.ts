// tasksSlice.ts
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
      state[task.status].unshift(task);
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

    moveTask(
      state,
      action: PayloadAction<{ from: ColumnType; to: ColumnType; id: string }>
    ) {
      const { from, to, id } = action.payload;
      if (from === to) {
        return;
      }
      let taskToMove: TaskData | undefined;
      const fromList = state[from];
      const toList = state[to];
      const index = fromList.findIndex((task) => task.id === id);

      if (index !== -1) {
        taskToMove = fromList[index];
        fromList.splice(index, 1);
      }

      if (taskToMove) {
        taskToMove.status = to;
        toList.unshift(taskToMove);
      }

      console.log("reducers", {
        index,
        from,
        to,
        id,
        taskToMove,
        toList,
      });
    },

    revertMoveTask(
      state,
      action: PayloadAction<{ from: ColumnType; to: ColumnType; id: string }>
    ) {
      const { from, to, id } = action.payload;
      let taskToRevert: TaskData | undefined;
      const fromList = state[to];
      const toList = state[from];

      const index = fromList.findIndex((task) => task.id === id);
      if (index !== -1) {
        taskToRevert = fromList[index];
        fromList.splice(index, 1);
      }

      if (taskToRevert) {
        taskToRevert.status = from;
        toList.push(taskToRevert);
      }
    },

    reorderTasks(
      state,
      action: PayloadAction<{
        column: ColumnType;
        fromIndex: number;
        toIndex: number;
      }>
    ) {
      const { column, fromIndex, toIndex } = action.payload;
      const tasks = state[column];
      const [movedTask] = tasks.splice(fromIndex, 1);
      tasks.splice(toIndex, 0, movedTask);
    },

    removeTask(state, action: PayloadAction<string>) {
      const id = action.payload;
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
  moveTask,
  reorderTasks,
  removeTask,
  revertMoveTask,
} = taskSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export default taskSlice.reducer;
