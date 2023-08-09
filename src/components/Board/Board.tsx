import { Box, styled, Typography } from '@mui/material';
import { useAppDispatch } from '@/src/store';
import { dialogsActions } from '@/src/slices/dialogs';
import { DIALOG_IDS } from '@/src/constants';
import useBoardsSelector from '@/src/hooks/useBoardsSelector';
import useColumnsSelector from '@/src/hooks/useColumnsSelector';
import EmptyBoard from '@/src/components/Board/EmptyBoard';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ColumnList from '@/src/components/Board/ColumnList';

export const BoardRoot = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100%',
  overflowX: 'auto',
  padding: 24,
  display: 'flex',
  gap: 24,
  [theme.breakpoints.down('sm')]: {
    paddingInline: 16
  }
}));

export const AddNewColumnButton = styled(Box)(({ theme }) => ({
  marginTop: 39,
  background:
    theme.palette.__mode === 'DARK'
      ? 'linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.13) 100%)'
      : 'linear-gradient(180deg, #E9EFFA 0%, rgba(233, 239, 250, 0.50) 100%)',
  minWidth: 280,
  maxWidth: 280,
  borderRadius: 6,
  display: 'grid',
  placeItems: 'center',
  userSelect: 'none',
  '& h1': {
    transition: theme.transitions.create('color')
  },
  '&:hover, &:hover h1': {
    color: 'var(--main-purple)',
    cursor: 'pointer'
  }
}));

export default function Board() {
  const dispatch = useAppDispatch();
  const board = useBoardsSelector(({ boards, activeBoardId }) => boards[activeBoardId]);
  const columns = useColumnsSelector(({ columnsOf }) => columnsOf?.[board?.id!]);
  const isBoardsReady = useBoardsSelector(({ isBoardsReady }) => isBoardsReady);
  const router = useRouter();

  console.log('board is rendered');

  //isBoardsReady will be false if the user has no boards
  useEffect(() => {
    if (!isBoardsReady) {
      router.push('/boards').then();
    }
  }, [router, isBoardsReady]);

  if (!board) return <></>;

  if (!board.columns.length) return <EmptyBoard />;

  return (
    <BoardRoot>
      {board.columns.map((column, index) => {
        const tasksIds = columns?.[column.id] ?? [];
        return (
          <ColumnList key={column.id} columnName={column.name} columnId={column.id} index={index} tasksIds={tasksIds} />
        );
      })}
      <AddNewColumnButton
        role='button'
        aria-label='Add New Column'
        onClick={() => {
          dispatch(dialogsActions.showDialog({ id: DIALOG_IDS.BOARD_DIALOG, type: 'edit' }));
        }}
      >
        <Typography variant='h1' color='var(--medium-grey)'>
          + New Column
        </Typography>
      </AddNewColumnButton>
    </BoardRoot>
  );
}
