import { RootState, useAppSelector } from '@/src/store';

export default function useTasksSelector<Key extends keyof RootState['__tasks'] = never>(
  selector?: (tasks: RootState['__tasks']) => RootState['__tasks'][Key]
) {
  return useAppSelector(state => {
    const __tasks = state.__tasks;
    return selector ? selector(__tasks) : __tasks;
  }) as RootState['__tasks'][Key] extends never ? RootState['__tasks'] : RootState['__tasks'][Key];
}
