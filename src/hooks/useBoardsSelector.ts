import { RootState, useAppSelector } from '@/src/store';

export default function useBoardsSelector<Key extends keyof RootState['__boards'] = never>(
  selector?: (boards: RootState['__boards']) => RootState['__boards'][Key]
) {
  return useAppSelector(state => {
    const __boards = state.__boards;
    return selector ? selector(__boards) : __boards;
  }) as RootState['__boards'][Key] extends never ? RootState['__boards'] : RootState['__boards'][Key];
}
