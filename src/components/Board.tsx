import { Box, styled, Typography } from '@mui/material';
import Task, { getTasksProps } from '@/src/components/Task';
import data from '@/src/data.json';

const BoardRoot = styled(Box)(({ theme }) => ({
  minHeight: 400,
  overflowX: 'auto',
  padding: 24,
  minWidth: '100%',
  display: 'flex',
  gap: 24,
  [theme.breakpoints.down('sm')]: {
    paddingInline: 16
  }
}));

const Column = styled(Box)(() => ({
  display: 'grid',
  gap: 24,
  alignContent: 'start'
}));

const Status = styled(Typography)(() => ({
  color: 'var(--medium-grey)',
  display: 'flex'
}));

export default function Board() {
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
    </BoardRoot>
  );
}
