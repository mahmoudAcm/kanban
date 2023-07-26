import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { columnsActions } from '@/src/slices/columns';
import { AppDispatch } from '@/src/store';
import { tasksActions } from '@/src/slices/tasks';

type Column = {
  id: string;
  name: string;
  boardId: string;
  tasks?: any;
};

type Board = {
  id: string;
  index: number;
  name: string;
  columns: Column[];
};

export const boardsSlice = createSlice({
  name: '__boards',
  initialState: {
    isBoardsReady: false,
    count: 0,
    boards: {} as Record<string, Board>,
    activeBoardId: ''
  },
  reducers: {
    initiateBoard(state, action: PayloadAction<Board[]>) {
      const boards = action.payload;
      let index = 0;
      for (const board of boards) {
        if (!state.activeBoardId) state.activeBoardId = board.id;
        state.boards[board.id] = {
          index,
          id: board.id,
          name: board.name,
          columns: board.columns.map(({ tasks, ...rest }) => rest)
        };
        index++;
      }
      state.count = boards.length;
      state.isBoardsReady = true;
    },
    setActiveBoardId(state, action: PayloadAction<string>) {
      state.activeBoardId = action.payload;
    },
    increaseCount(state) {
      state.count++;
    },
    updateOrAddBoard(state, action: PayloadAction<Board>) {
      const board = action.payload;
      const len = state.count;
      const prevIndex = state.boards[board.id]?.index;

      state.boards[board.id] = {
        index: prevIndex ?? len,
        id: board.id,
        name: board.name,
        columns: board.columns.map(({ tasks, ...rest }) => rest)
      };
    },
    removeBoard(state, action: PayloadAction<string>) {
      const id = action.payload;
      delete state.boards[id];
    }
  }
});

export const boardsReducer = boardsSlice.reducer;

function apiInitiateBoards() {
  return async (dispatch: AppDispatch) => {
    const res = await axios.get<Board[]>('/api/boards');
    const data = res.data;
    for (const board of data) {
      dispatch(columnsActions.updateOrAddColumns(board.columns.map(({ id }) => id)));
      for (const column of board.columns) {
        for (const task of column.tasks) {
          dispatch(tasksActions.updateOrAddTask(task));
          dispatch(columnsActions.addTaskIdToColumn({ columnId: column.id, taskId: task.id }));
        }
      }
    }
    dispatch(boardsSlice.actions.initiateBoard(data));
    return data?.[0].id;
  };
}

function apiAddBoard(board: { name: string; columns: { name: string }[] }) {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await axios.post<{ message: string; board: Board }>('/api/boards', board);
      const data = res.data;
      dispatch(boardsSlice.actions.updateOrAddBoard(data.board));
      dispatch(boardsSlice.actions.increaseCount());
      dispatch(columnsActions.updateOrAddColumns(data.board.columns.map(({ id }) => id)));
      return data.message;
    } catch (error) {
      throw error;
    }
  };
}

function apiUpdateBoard(board: { id: string; name: string; columns: { id?: string; name: string }[] }) {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await axios.put<{ message: string; board: Board }>('/api/boards/' + board.id, board);
      const data = res.data;
      dispatch(boardsSlice.actions.updateOrAddBoard(data.board));
      dispatch(columnsActions.updateOrAddColumns(data.board.columns.map(({ id }) => id)));
      return data.message;
    } catch (error) {
      throw error;
    }
  };
}

function apiRemoveBoard(boards: Record<string, Board>, id: string) {
  return async () => {
    await axios.delete('/api/boards/' + id);
    const columns = boards[id].columns;
    for (const column of columns) {
      columnsActions.removeColumn(column.id);
    }
  };
}

export const boardsActions = { apiInitiateBoards, apiAddBoard, apiUpdateBoard, apiRemoveBoard, ...boardsSlice.actions };
