import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tasksActions } from '@/src/slices/tasks';
import { AppDispatch } from '@/src/store';

export const columnsSlice = createSlice({
  name: '__columns',
  initialState: {
    columnsOf: {} as Record<string, Record<string, string[]>>
  },
  reducers: {
    updateOrAddColumns(state, action: PayloadAction<{ boardId: string; tasksIds: string[] }>) {
      const { boardId, tasksIds } = action.payload;
      for (const id of tasksIds) {
        if (!state.columnsOf[boardId]) state.columnsOf[boardId] = {};
        state.columnsOf[boardId][id] ??= [];
      }
    },
    removeColumn(state, action: PayloadAction<{ boardId: string; id: string }>) {
      const { boardId, id } = action.payload;
      const taskIds = state.columnsOf?.[boardId]?.[id];
      for (const taskId of taskIds) {
        tasksActions.removeTask({ columnId: id, id: taskId });
      }
      delete state.columnsOf[id];
    },
    addTaskIdToColumn(state, action: PayloadAction<{ boardId: string; columnId: string; taskId: string }>) {
      const { boardId, columnId, taskId } = action.payload;
      if (!state.columnsOf?.[boardId]?.[columnId].includes(taskId)) state.columnsOf[boardId][columnId].push(taskId);
    },
    removeTaskIdFromColumn(state, action: PayloadAction<{ boardId: string; columnId: string; taskId: string }>) {
      const { boardId, columnId, taskId } = action.payload;
      if (!state.columnsOf[boardId]) state.columnsOf[boardId] = {};
      state.columnsOf[boardId][columnId] = state.columnsOf[boardId]?.[columnId].filter(id => id !== taskId);
    }
  }
});

function moveTaskBetweenColumns(boardId: string, srcColumnId: string, destColumnId: string, taskId: string) {
  return async (dispatch: AppDispatch) => {
    dispatch(columnsActions.removeTaskIdFromColumn({ boardId, columnId: srcColumnId, taskId }));
    dispatch(columnsActions.addTaskIdToColumn({ boardId, columnId: destColumnId, taskId }));
  };
}

export const columnsReducer = columnsSlice.reducer;

export const columnsActions = { moveTaskBetweenColumns, ...columnsSlice.actions };
