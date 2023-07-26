import { RootState, useAppSelector } from '@/src/store';
import { createSelector } from 'reselect';

type State = RootState['__tasks'];

export default function useTasksSelector<T>(selector?: (__tasks: State) => T | State) {
  return useAppSelector(
    createSelector((state: RootState) => {
      return state.__tasks;
    }, selector ?? (__tasks => __tasks))
  ) as T | undefined;
}
