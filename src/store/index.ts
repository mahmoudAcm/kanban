import { Action, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
// import { kanbanReducer } from '../slices/kanban';
import { dialogsReducer } from '../slices/dialogs';

const store = configureStore({
  reducer: {
    // kanban: kanbanReducer,
    dialogs: dialogsReducer
  }
  // devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector = useReduxSelector<RootState>;

type AppDispatch = ThunkDispatch<any, any, Action>;

export const useAppDispatch = () => useReduxDispatch<AppDispatch>();

export default store;
