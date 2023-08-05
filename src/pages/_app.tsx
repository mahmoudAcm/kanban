import '@/src/styles/globals.css';
import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { Box, CssBaseline } from '@mui/material';
import type { AppProps as DefaultAppProps } from 'next/app';
import createEmotionCache from '../libs/createEmotionCache';
import { FunctionComponent, ReactNode } from 'react';
import { NextPage } from 'next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CustomThemeProvider } from '@/src/contexts/CustomThemeContext';
import { Provider } from 'react-redux';
import store from '@/src/store';
import { PageLoadingProvider } from '@/src/contexts/PageLoadingContext';

const clientSideEmotionCache = createEmotionCache();

interface AppProps extends DefaultAppProps {
  Component: NextPage;
  emotionCache?: EmotionCache;
}

const App: FunctionComponent<AppProps> = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page: ReactNode) => <Box>{page}</Box>);

  const authGuard = Component.authGuard ?? false;

  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <PageLoadingProvider>
          <CustomThemeProvider>
            <CssBaseline />
            <Box
              sx={{
                '& .Toastify__toast': {
                  boxShadow: '0px 10px 20px 0px rgba(54, 78, 126, 0.25)'
                },
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
              <ToastContainer limit={4} newestOnTop containerId='ToastContainer-1' />
            </Box>
            {!authGuard && getLayout(<Component {...pageProps} />)}
          </CustomThemeProvider>
        </PageLoadingProvider>
      </Provider>
    </CacheProvider>
  );
};

export default App;
