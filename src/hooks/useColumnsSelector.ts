import { RootState, useAppSelector } from '@/src/store';
import { createSelector } from 'reselect';

type State = RootState['__columns'];

export default function useColumnsSelector<T>(selector?: (__columns: State) => T | State) {
  return useAppSelector(
    createSelector((state: RootState) => {
      return state.__columns;
    }, selector ?? (__columns => __columns))
  ) as T | undefined;
}
