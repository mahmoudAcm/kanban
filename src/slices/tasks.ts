import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SubTask = {
  id: string;
  title: string;
  isCompleted: boolean;
  taskId: string;
};

type Task = {
  id: string;
  title: string;
  description: string;
  columnId: string;
  status: string;
  subtasks: SubTask[];
};

export const tasksSlice = createSlice({
  name: '__tasks',
  initialState: {
    tasks: {} as Record<string, Task>,
    activeTaskId: ''
  },
  reducers: {
    updateOrAddTask(state, action: PayloadAction<Task>) {
      const task = action.payload;
      state.tasks[task.id] = task;
    },
    removeTask(state, action: PayloadAction<string>) {
      const id = action.payload;
      delete state.tasks[id];
    },
    setActiveTaskId(state, action: PayloadAction<string>) {
      state.activeTaskId = action.payload;
    }
  }
});

export const tasksReducer = tasksSlice.reducer;

export const tasksActions = { ...tasksSlice.actions };
