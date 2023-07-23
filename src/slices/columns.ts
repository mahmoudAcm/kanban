import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tasksActions } from '@/src/slices/tasks';

export const columnsSlice = createSlice({
  name: '__columns',
  initialState: {
    columns: {} as Record<string, string[]>
  },
  reducers: {
    updateOrAddColumns(state, action: PayloadAction<string[]>) {
      const ids = action.payload;
      for (const id of ids) {
        state.columns[id] ??= [];
      }
    },
    removeColumn(state, action: PayloadAction<string>) {
      const id = action.payload;
      const taskIds = state.columns[id];
      for (const id of taskIds) {
        tasksActions.removeTask(id);
      }
      delete state.columns[id];
    },
    addTaskIdToColumn(state, action: PayloadAction<{ columnId: string; taskId: string }>) {
      const { columnId, taskId } = action.payload;
      if (!state.columns[columnId].includes(taskId)) state.columns[columnId].push(taskId);
    },
    removeTaskIdFromColumn(state, action: PayloadAction<{ columnId: string; taskId: string }>) {
      const { columnId, taskId } = action.payload;
      state.columns[columnId] = state.columns[columnId].filter(id => id !== taskId);
    }
  }
});

export const columnsReducer = columnsSlice.reducer;

export const columnsActions = { ...columnsSlice.actions };
