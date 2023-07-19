import { Box, styled, Typography } from '@mui/material';
import Task, { getTasksProps } from '@/src/components/Task';
import data from '@/src/data.json';
import { useAppDispatch } from '@/src/store';
import { dialogsActions } from '@/src/slices/dialogs';
import { DIALOG_IDS } from '@/src/constants';

const BoardRoot = styled(Box)(({ theme }) => ({
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

const Status = styled(Typography)(() => ({
  color: 'var(--medium-grey)',
  display: 'flex'
}));

const Column = styled(Box)(() => ({
  minWidth: 280,
  maxWidth: 280,
  display: 'grid',
  gap: 24,
  alignContent: 'start'
}));

const AddNewColumnButton = styled(Box)(({ theme }) => ({
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

export default function Board() {
  const dispatch = useAppDispatch();

  return (
    <BoardRoot>
      {data.boards[0].columns.map((column, index) => (
        <Column key={index}>
          <Status variant='h4'>
            <Box
              sx={{
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                background: 'hsla(193, 75%, 59%, 1)',
                mr: '12px'
              }}
            />
            {column.name} ({column.tasks.length})
          </Status>
          <Box sx={{ display: 'grid', gap: '20px' }}>
            {column.tasks.map((task, index) => (
              <Task key={index} {...getTasksProps(task)} />
            ))}
          </Box>
        </Column>
      ))}
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
