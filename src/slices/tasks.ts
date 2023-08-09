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
  subtasks: SubTask[];
};

export const tasksSlice = createSlice({
  name: '__tasks',
  initialState: {
    tasksOf: {} as Record<string, Record<string, Task>>,
    activeTask: {
      id: '',
      columnId: ''
    }
  },
  reducers: {
    updateOrAddTask(state, action: PayloadAction<Task>) {
      const task = action.payload;
      if (!state.tasksOf?.[task.columnId]) state.tasksOf[task.columnId] = {};
      state.tasksOf[task.columnId][task.id] = task;
    },
    removeTask(state, action: PayloadAction<{ id: string; columnId: string }>) {
      const { id, columnId } = action.payload;
      if (state.tasksOf[columnId]) delete state.tasksOf[columnId][id];
    },
    setActiveTaskId(state, action: PayloadAction<{ id: string; columnId: string }>) {
      state.activeTask = action.payload;
    },
    toggleSubtask(state, action: PayloadAction<{ id: string; taskId: string; columnId: string }>) {
      const { columnId, taskId, id } = action.payload;
      const task = state.tasksOf?.[columnId]?.[taskId];
      if (task) {
        const subtaskIndex = task.subtasks.findIndex(subtask => subtask.id === id);
        if (subtaskIndex !== -1) {
          task.subtasks[subtaskIndex].isCompleted = !task.subtasks[subtaskIndex].isCompleted;
        }
      }
    },
    moveTask(state, action: PayloadAction<{ id: string; srcColumnId: string; destColumnId: string }>) {
      const { id, srcColumnId, destColumnId } = action.payload;
      const task = state.tasksOf?.[srcColumnId]?.[id];
      if (task) {
        if (!state.tasksOf?.[destColumnId]) state.tasksOf[destColumnId] = {};
        task.columnId = destColumnId;
        delete state.tasksOf?.[srcColumnId]?.[id];
        state.tasksOf[destColumnId][id] = task;
        if (state.activeTask.id === task.id) {
          state.activeTask.columnId = destColumnId;
        }
      }
    }
  }
});

export const tasksReducer = tasksSlice.reducer;

function apiAddTask(
  boardId: string,
  columnId: string,
  newTask: {
    title: string;
    description: string;
    subtasks: { title: string }[];
  }
) {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await axios.post<{ task: Task }>(`/api/boards/${boardId}/columns/${columnId}/tasks`, newTask);
      const { task } = res.data;

      dispatch(tasksSlice.actions.updateOrAddTask(task));
      dispatch(columnsActions.addTaskIdToColumn({ boardId, columnId, taskId: task.id }));
    } catch (error) {
      throw error;
    }
  };
}

function apiUpdateTask(
  boardId: string,
  srcColumnId: string,
  destColumnId: string,
  id: string,
  newTask: {
    title: string;
    description: string;
    subtasks: { title: string }[];
  }
) {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await axios.put<Task>(`/api/boards/${boardId}/columns/${srcColumnId}/tasks/${id}`, {
        ...newTask,
        newColumnId: destColumnId
      });
      const task = res.data;

      dispatch(tasksSlice.actions.updateOrAddTask(task));

      //if the column id changed means we updated the task status
      if (destColumnId !== srcColumnId) {
        await dispatch(columnsActions.moveTaskBetweenColumns(boardId, srcColumnId, destColumnId, task.id));
        dispatch(
          tasksSlice.actions.moveTask({
            srcColumnId,
            destColumnId,
            id: task.id
          })
        );
      }
    } catch (error) {
      throw error;
    }
  };
}

function apiToggleSubtask(boardId: string, columnId: string, taskId: string, id: string) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(tasksSlice.actions.toggleSubtask({ taskId, id, columnId }));
      await axios.patch(`/api/boards/${boardId}/columns/${columnId}/tasks/${taskId}/subtasks/${id}`);
    } catch (error) {
      //revert back to the previous state if toggling failed
      dispatch(tasksSlice.actions.toggleSubtask({ taskId, id, columnId }));
      throw error;
    }
  };
}

function apiMoveTask(boardId: string, destColumnId: string, task: Task) {
  return async (dispatch: AppDispatch) => {
    const srcColumnId = task.columnId;
    try {
      await dispatch(columnsActions.moveTaskBetweenColumns(boardId, srcColumnId, destColumnId, task.id));
      dispatch(tasksSlice.actions.moveTask({ srcColumnId, destColumnId, id: task.id }));

      await axios.patch(`/api/boards/${boardId}/columns/${srcColumnId}/tasks/${task.id}`, {
        destinationColumnId: destColumnId
      });
    } catch (error) {
      throw error;
    }
  };
}

function apiRemoveTask(boardId: string, columnId: string, id: string) {
  return async (dispatch: AppDispatch) => {
    try {
      await axios.delete(`/api/boards/${boardId}/columns/${columnId}/tasks/${id}`);
      dispatch(tasksSlice.actions.removeTask({ id, columnId }));
      dispatch(columnsActions.removeTaskIdFromColumn({ boardId, columnId, taskId: id }));
    } catch (error) {
      throw error;
    }
  };
}

export const tasksActions = {
  apiAddTask,
  apiUpdateTask,
  apiToggleSubtask,
  apiMoveTask,
  apiRemoveTask,
  ...tasksSlice.actions
};
