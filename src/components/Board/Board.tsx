import { Box, styled, Typography } from '@mui/material';
import Task, { getTasksProps } from '@/src/components/Task';
import { useAppDispatch } from '@/src/store';
import { dialogsActions } from '@/src/slices/dialogs';
import { DIALOG_IDS } from '@/src/constants';
import useBoardsSelector from '@/src/hooks/useBoardsSelector';
import { useActiveColumnsSelector } from '@/src/hooks/useColumnsSelector';
import useTasksSelector from '@/src/hooks/useTasksSelector';
import EmptyBoard from '@/src/components/Board/EmptyBoard';

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

export const Status = styled(Typography)(() => ({
  color: 'var(--medium-grey)',
  display: 'flex'
}));

export const Column = styled(Box)(() => ({
  minWidth: 280,
  maxWidth: 280,
  display: 'grid',
  gap: 24,
  alignContent: 'start'
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
  '&:hover h1': {
    color: 'var(--main-purple)',
    cursor: 'pointer'
  }
}));

function getStatusColor(index: number) {
  const colors = ['#49C4E5', '#8471F2', '#67E2AE', '#EB144C', '#FF6900', '#ABB8C3'];
  return colors[index % colors.length];
}

export default function Board() {
  const dispatch = useAppDispatch();
  const columns = useActiveColumnsSelector();
  const tasks = useTasksSelector(({ tasks }) => tasks);
  const board = useBoardsSelector(({ boards, activeBoardId }) => boards[activeBoardId]);

  console.log('board is rendered');

  if (!board) return <></>;

  if (!board.columns.length) return <EmptyBoard />;

  return (
    <BoardRoot>
      {board.columns.map((column, index) => {
        const tasksIds = columns[column.id];
        return (
          <Column key={index}>
            <Status variant='h4'>
              <Box
                sx={{
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  // background: 'hsla(193, 75%, 59%, 1)',
                  background: getStatusColor(index),
                  mr: '12px'
                }}
              />
              {column.name} ({tasksIds.length})
            </Status>
            <Box sx={{ display: 'grid', gap: '20px' }}>
              {tasksIds.map((taskId, index) => {
                const task = tasks?.[taskId];
                if (!task) return <></>;
                return <Task key={index} {...getTasksProps(task)} />;
              })}
            </Box>
          </Column>
        );
      })}
      <AddNewColumnButton role='button' aria-label='Add New Column'>
        <Typography
          variant='h1'
          color='var(--medium-grey)'
          onClick={() => {
            dispatch(dialogsActions.showDialog({ id: DIALOG_IDS.BOARD_DIALOG, type: 'edit' }));
          }}
        >
          + New Column
        </Typography>
      </AddNewColumnButton>
    </BoardRoot>
  );
}
