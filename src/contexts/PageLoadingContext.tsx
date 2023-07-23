import { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import useBoardsSelector from '@/src/hooks/useBoardsSelector';

export const PageLoadingContext = createContext({
  isPageLoading: true
});

export function PageLoadingProvider({ children }: { children: ReactNode }) {
  const [isPageLoading, setPageLoading] = useState(true);
  const timeoutRef = useRef<any | null>(null);
  const isBoardsReady = useBoardsSelector<'isBoardsReady'>(__boards => __boards.isBoardsReady);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setPageLoading(false);
    }, 500);
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <PageLoadingContext.Provider value={{ isPageLoading: isPageLoading || !isBoardsReady }}>
      {children}
    </PageLoadingContext.Provider>
  );
}
