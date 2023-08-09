import MainLayout from '@/src/components/layouts/MainLayout';
import { ReactNode, useEffect } from 'react';
import { Box } from '@mui/material';
import Head from 'next/head';
import BoardDialog from '@/src/components/Board/BoardDialog';
import TaskDialog from '@/src/components/Task/TaskDialog';
import Board from '@/src/components/Board';
import ViewTaskDetailsDialog from '@/src/components/Task/ViewTaskDetailsDialog';
import BoardLoadingScreen from '@/src/components/Board/BoardLoadingScreen';
import { useAppDispatch } from '@/src/store';
import { boardsActions } from '@/src/slices/boards';
import useBoardsSelector from '@/src/hooks/useBoardsSelector';
import { useRouter } from 'next/router';
import DeleteBoardDialog from '@/src/components/Board/DeleteBoardDialog';
import DeleteTaskDialog from '@/src/components/Task/DeleteTaskDialog';
import ProfileDialog from '@/src/components/Dialogs/ProfileDialog';

function BoardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isBoardsReady = useBoardsSelector(({ isBoardsReady }) => isBoardsReady);

  useEffect(() => {
    if (!isBoardsReady)
      dispatch(boardsActions.apiInitiateBoards()).then(async id => {
        if (!id) {
          await router.push('/boards');
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isBoardsReady]);

  useEffect(() => {
    if (router.isReady) {
      dispatch(boardsActions.setActiveBoardId(router.query.id as string));
    }
  }, [router, dispatch]);

  return (
    <Box sx={{ height: 'max(400px, 100%)' }}>
      <Head>
        <title>Kanban App</title>
      </Head>
      <BoardDialog />
      <TaskDialog />
      <ViewTaskDetailsDialog />
      <DeleteBoardDialog />
      <DeleteTaskDialog />
      <ProfileDialog />
      {!isBoardsReady ? <BoardLoadingScreen /> : <Board />}
    </Box>
  );
}

BoardPage.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;

BoardPage.authGuard = true;

export default BoardPage;
