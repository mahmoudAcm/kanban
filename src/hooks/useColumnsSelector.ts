import { RootState, useAppSelector } from '@/src/store';

export default function useColumnsSelector() {
  return useAppSelector(state => state.__columns) as RootState['__columns'];
}
