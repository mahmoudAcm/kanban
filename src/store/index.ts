import { Action, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { dialogsReducer } from '../slices/dialogs';
import { boardsReducer } from '@/src/slices/boards';
import { columnsReducer } from '@/src/slices/columns';
import { tasksReducer } from '@/src/slices/tasks';

const store = configureStore({
  reducer: {
    __boards: boardsReducer,
    __columns: columnsReducer,
    __tasks: tasksReducer,
    dialogs: dialogsReducer
  }
  // devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector = useReduxSelector<RootState>;

export type AppDispatch = ThunkDispatch<any, any, Action>;

export const useAppDispatch = () => useReduxDispatch<AppDispatch>();

export default store;
