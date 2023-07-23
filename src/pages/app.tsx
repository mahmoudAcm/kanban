import MainLayout from '@/src/components/layouts/MainLayout';
import { ReactNode, useEffect } from 'react';
import { Box } from '@mui/material';
import Head from 'next/head';
import BoardDialog from '@/src/components/Board/BoardDialog';
import TaskDialog from '@/src/components/TaskDialog';
import Board from '@/src/components/Board';
import ViewTaskDetailsDialog from '@/src/components/ViewTaskDetailsDialog';
import BoardLoadingScreen from '@/src/components/Board/BoardLoadingScreen';
import usePageLoadingContext from '@/src/hooks/usePageLoadingContext';
import { useAppDispatch } from '@/src/store';
import { boardsActions } from '@/src/slices/boards';

function App() {
  const dispatch = useAppDispatch();
  const { isPageLoading } = usePageLoadingContext();

  useEffect(() => {
    dispatch(boardsActions.apiInitiateBoards()).then();
  }, [dispatch]);

  return (
    <Box sx={{ height: 'max(400px, 100%)' }}>
      <Head>
        <title>App</title>
      </Head>
      <BoardDialog />
      <TaskDialog />
      <ViewTaskDetailsDialog />
      {isPageLoading ? <BoardLoadingScreen /> : <Board />}
    </Box>
  );
}

App.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;

App.authGuard = process.env.NODE_ENV === 'production';

export default App;
