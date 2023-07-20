import { createContext, ReactNode, useEffect, useRef, useState } from 'react';

export const PageLoadingContext = createContext({
  isPageLoading: true
});

export function PageLoadingProvider({ children }: { children: ReactNode }) {
  const [isPageLoading, setPageLoading] = useState(true);
  const timeoutRef = useRef<any | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setPageLoading(false);
    }, 500);
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  return <PageLoadingContext.Provider value={{ isPageLoading }}>{children}</PageLoadingContext.Provider>;
}
