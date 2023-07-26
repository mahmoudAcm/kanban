import BoardLoadingScreen from '@/src/components/Board/BoardLoadingScreen';
import { ReactNode, useEffect } from 'react';
import MainLayout from '@/src/components/layouts/MainLayout';
import { boardsActions } from '@/src/slices/boards';
import { useAppDispatch } from '@/src/store';
import { useRouter } from 'next/router';
import Head from 'next/head';

function BoardsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (router.isReady) dispatch(boardsActions.apiInitiateBoards()).then(id => router.push('/boards/' + id));
  }, [router, dispatch]);

  return (
    <>
      <Head>
        <title>Loading...</title>
        <link rel='shortcut icon' href='/loading_favicon.ico' />
      </Head>
      <BoardLoadingScreen />
    </>
  );
}

BoardsPage.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;

BoardsPage.authGuard = process.env.NODE_ENV === 'production';

export default BoardsPage;
