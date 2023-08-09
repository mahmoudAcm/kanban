import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DIALOG_IDS } from '../constants';

type DialogType = 'edit' | 'create';

const slice = createSlice({
  name: 'dialogs',
  initialState: {
    [DIALOG_IDS.BOARD_DIALOG]: { show: false, type: 'create' as DialogType, name: 'BOARD_DIALOG' },
    [DIALOG_IDS.TASK_DIALOG]: { show: false, type: 'create' as DialogType, name: 'TASK_DIALOG' },
    [DIALOG_IDS.VIEW_TASK_DIALOG]: { show: false, name: 'VIEW_TASK_DIALOG' },
    [DIALOG_IDS.DELETE_BOARD_DIALOG]: { show: false, name: 'DELETE_BOARD_DIALOG' },
    [DIALOG_IDS.DELETE_TASK_DIALOG]: { show: false, name: 'DELETE_TASK_DIALOG' },
    [DIALOG_IDS.PROFILE_DIALOG]: { show: false, name: 'PROFILE_DIALOG' }
  } as Record<string, { show: boolean; type?: DialogType }>,
  reducers: {
    showDialog(state, action: PayloadAction<{ id: string; type?: DialogType }>) {
      state[action.payload.id].show = true;
      state[action.payload.id].type = action.payload.type ?? state[action.payload.id].type;
    },
    closeDialog(state, action: PayloadAction<string>) {
      state[action.payload].show = false;
    }
  }
});

export const dialogsReducer = slice.reducer;

export const dialogsActions = slice.actions;

export default slice;
