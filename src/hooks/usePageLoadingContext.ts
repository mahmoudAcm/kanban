import { useContext } from 'react';
import { PageLoadingContext } from '@/src/contexts/PageLoadingContext';

export default function usePageLoadingContext() {
  return useContext(PageLoadingContext);
}
