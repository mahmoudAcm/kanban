import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '@/src/store';
import axios from 'axios';
import { columnsActions } from '@/src/slices/columns';

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
    },
    toggleSubtask(state, action: PayloadAction<{ taskId: string; id: string }>) {
      const { taskId, id } = action.payload;
      const task = state.tasks?.[taskId];
      if (task) {
        const subtaskIndex = task.subtasks.findIndex(subtask => subtask.id === id);
        if (subtaskIndex !== -1) {
          task.subtasks[subtaskIndex].isCompleted = !task.subtasks[subtaskIndex].isCompleted;
        }
      }
    },
    moveTask(state, action: PayloadAction<{ id: string; destColumnId: string; status: string }>) {
      const { id, destColumnId, status } = action.payload;
      const task = state.tasks?.[id];
      if (task) {
        task.columnId = destColumnId;
        task.status = status;
      }
    }
  }
});

export const tasksReducer = tasksSlice.reducer;

function apiToggleSubtask(boardId: string, columnId: string, taskId: string, id: string) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(tasksSlice.actions.toggleSubtask({ taskId, id }));
      await axios.patch(`/api/boards/${boardId}/columns/${columnId}/tasks/${taskId}/subtasks/${id}`);
    } catch (error) {
      //revert back to the previous state if toggling failed
      dispatch(tasksSlice.actions.toggleSubtask({ taskId, id }));
      throw error;
    }
  };
}

function apiMoveTask(boardId: string, destColumnId: string, status: string, task: Task) {
  return async (dispatch: AppDispatch) => {
    const srcColumnId = task.columnId;
    try {
      await dispatch(columnsActions.moveTaskBetweenColumns(srcColumnId, destColumnId, task.id));
      dispatch(tasksSlice.actions.moveTask({ destColumnId, id: task.id, status }));

      await axios.patch(`/api/boards/${boardId}/columns/${srcColumnId}/tasks/${task.id}`, {
        destinationColumnId: destColumnId
      });
    } catch (error) {
      throw error;
    }
  };
}

export const tasksActions = { apiToggleSubtask, apiMoveTask, ...tasksSlice.actions };
