import '@/src/styles/globals.css';
import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps as DefaultAppProps } from 'next/app';
import createEmotionCache from '../libs/createEmotionCache';
import { FunctionComponent, ReactNode } from 'react';
import { NextPage } from 'next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCustomTheme } from '@/src/theme';

const clientSideEmotionCache = createEmotionCache();

interface AppProps extends DefaultAppProps {
  Component: NextPage;
  emotionCache?: EmotionCache;
}

const App: FunctionComponent<AppProps> = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page: ReactNode) => <Box>{page}</Box>);

  const authGuard = Component.authGuard ?? false;

  const theme = useCustomTheme();

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            '& .Toastify__toast-container': {
              '@media (max-width: 487px)': {
                width: 'calc(100% - 2em)',
                top: '1em',
                left: '1em',
                right: '1em',
                '& .Toastify__toast': {
                  marginBottom: '1rem'
                }
              }
            }
          }}
        >
          <ToastContainer limit={4} newestOnTop />
        </Box>
        {!authGuard && getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
