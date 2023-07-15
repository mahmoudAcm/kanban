import MainLayout from '@/src/components/layouts/MainLayout';
import { ReactNode } from 'react';
import { Box } from '@mui/material';
import Head from 'next/head';
import EmptyBoard from '@/src/components/EmptyBoard';
import BoardDialog from '@/src/components/BoardDialog';

function App() {
  return (
    <Box sx={{ height: '100%' }}>
      <Head>
        <title>App</title>
      </Head>
      <EmptyBoard />
      <BoardDialog />
    </Box>
  );
}

App.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;

App.authGuard = process.env.NODE_ENV === 'production';

export default App;
