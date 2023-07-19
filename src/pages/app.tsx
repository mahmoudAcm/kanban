import MainLayout from '@/src/components/layouts/MainLayout';
import { ReactNode } from 'react';
import { Box } from '@mui/material';
import Head from 'next/head';
import EmptyBoard from '@/src/components/EmptyBoard';
import BoardDialog from '@/src/components/BoardDialog';
import TaskDialog from '@/src/components/TaskDialog';
import Board from '@/src/components/Board';
import ViewTaskDetailsDialog from '@/src/components/ViewTaskDetailsDialog';

function App() {
  return (
    <Box sx={{ height: '20%' }}>
      <Head>
        <title>App</title>
      </Head>
      {/*<EmptyBoard />*/}
      <BoardDialog />
      <ViewTaskDetailsDialog />
      <TaskDialog />
      <Board />
    </Box>
  );
}

App.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;

App.authGuard = process.env.NODE_ENV === 'production';

export default App;
