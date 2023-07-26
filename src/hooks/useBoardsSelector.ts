import { RootState, useAppSelector } from '@/src/store';
import { createSelector } from 'reselect';

type State = RootState['__boards'];

export default function useBoardsSelector<T>(selector?: (__boards: State) => T | State) {
  return useAppSelector(
    createSelector((state: RootState) => {
      return state.__boards;
    }, selector ?? (__boards => __boards))
  ) as T | undefined;
}
