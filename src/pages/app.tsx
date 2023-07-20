import MainLayout from '@/src/components/layouts/MainLayout';
import { ReactNode } from 'react';
import { Box } from '@mui/material';
import Head from 'next/head';
import EmptyBoard from '@/src/components/Board/EmptyBoard';
import BoardDialog from '@/src/components/Board/BoardDialog';
import TaskDialog from '@/src/components/TaskDialog';
import Board from '@/src/components/Board';
import ViewTaskDetailsDialog from '@/src/components/ViewTaskDetailsDialog';
import BoardLoadingScreen from '@/src/components/Board/BoardLoadingScreen';

function App() {
  return (
    <Box sx={{ height: '20%' }}>
      <Head>
        <title>App</title>
      </Head>
      {/*<EmptyBoard />*/}
      {/*<BoardDialog />*/}
      {/*<TaskDialog />*/}
      {/*<ViewTaskDetailsDialog />*/}
      {/*<Board />*/}
      <BoardLoadingScreen />
    </Box>
  );
}

App.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;

App.authGuard = process.env.NODE_ENV === 'production';

export default App;
