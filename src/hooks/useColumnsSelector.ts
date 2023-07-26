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

export function useActiveColumnsSelector() {
  const activeColumns = {} as Record<string, string[]>;
  return useAppSelector(
    createSelector(
      (state: RootState) => {
        const { boards, activeBoardId } = state.__boards;
        return boards[activeBoardId];
      },
      (state: RootState) => state.__columns,
      (board, __columns) => {
        const { columns } = __columns;
        for (const column of board?.columns ?? []) {
          activeColumns[column.id] = columns[column.id];
        }
        return activeColumns;
      }
    )
  ) as Record<string, string[]>;
}
