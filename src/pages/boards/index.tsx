import { getFirstBoardId } from '@/src/server/controllers/boards';

export default function BoardsPage() {
  return <></>;
}

export async function getServerSideProps() {
  const boardId = await getFirstBoardId();
  return {
    redirect: {
      destination: boardId !== '404' ? '/boards/' + boardId : '/not-found',
      permanent: false
    }
  };
}
