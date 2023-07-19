import { RootState, useAppSelector } from '@/src/store';

export default function useDialogsSelector() {
  return useAppSelector(state => state.dialogs) as RootState['dialogs'];
}
