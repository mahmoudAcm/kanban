import { getFirstBoardId } from '@/src/server/controllers/boards';
import { GetServerSidePropsContext } from 'next';
import BoardDialog from '@/src/components/Board/BoardDialog';
import { useAppDispatch } from '@/src/store';
import { useEffect } from 'react';
import { dialogsActions } from '@/src/slices/dialogs';
import { DIALOG_IDS } from '@/src/constants';
import Head from 'next/head';

function BoardsPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      dialogsActions.showDialog({
        id: DIALOG_IDS.BOARD_DIALOG,
        type: 'create'
      })
    );
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Get Started: Create Your First Kanban Board</title>
      </Head>
      <BoardDialog />
    </>
  );
}

BoardsPage.authGuard = true;

export default BoardsPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const boardId = await getFirstBoardId(context.req);

    if (boardId === '404') return { props: {} };

    return {
      redirect: {
        destination: boardId !== '404' ? '/boards/' + boardId : '/',
        permanent: false
      }
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: 'https://selected-airedale-49.accounts.dev/sign-in',
        permanent: false
      }
    };
  }
}
