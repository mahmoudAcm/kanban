import MainLayout from '@/src/components/layouts/MainLayout';
import { ReactNode } from 'react';
import { Box } from '@mui/material';
import Head from 'next/head';

function App() {
  return (
    <Box>
      <Head>
        <title>App</title>
      </Head>
    </Box>
  );
}

App.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;

App.authGuard = process.env.NODE_ENV === 'production';

export default App;
