import MainLayout from '@/src/components/layouts/MainLayout';
import { ReactNode, useEffect } from 'react';
import { Box } from '@mui/material';
import Head from 'next/head';
import BoardDialog from '@/src/components/Board/BoardDialog';
import TaskDialog from '@/src/components/TaskDialog';
import Board from '@/src/components/Board';
import ViewTaskDetailsDialog from '@/src/components/ViewTaskDetailsDialog';
import BoardLoadingScreen from '@/src/components/Board/BoardLoadingScreen';
import { useAppDispatch } from '@/src/store';
import { boardsActions } from '@/src/slices/boards';
import useBoardsSelector from '@/src/hooks/useBoardsSelector';
import { useRouter } from 'next/router';

function BoardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isBoardsReady = useBoardsSelector(({ isBoardsReady }) => isBoardsReady);

  useEffect(() => {
    if (!isBoardsReady) dispatch(boardsActions.apiInitiateBoards()).then();
  }, [dispatch, isBoardsReady]);

  useEffect(() => {
    if (router.isReady) {
      dispatch(boardsActions.setActiveBoardId(router.query.id as string));
    }
  }, [router, dispatch]);

  return (
    <Box sx={{ height: 'max(400px, 100%)' }}>
      <Head>
        <title>App</title>
      </Head>
      <BoardDialog />
      <TaskDialog />
      <ViewTaskDetailsDialog />
      {!isBoardsReady ? <BoardLoadingScreen /> : <Board />}
    </Box>
  );
}

BoardPage.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;

BoardPage.authGuard = process.env.NODE_ENV === 'production';

export default BoardPage;
