import { Box, Skeleton } from '@mui/material';
import Task, { getTasksProps } from '@/src/components/Task';
import data from '@/src/data.json';
import { AddNewColumnButton, BoardRoot, Column, Status } from '@/src/components/Board/Board';

export default function BoardLoadingScreen() {
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
                background: theme => (theme.palette.__mode === 'DARK' ? 'var(--dark-grey)' : 'white'),
                mr: '12px'
              }}
            />
            <Box
              sx={{
                width: '72px',
                height: '10.5px',
                borderRadius: '15px',
                background: theme => (theme.palette.__mode === 'DARK' ? 'var(--dark-grey)' : 'white')
              }}
            />
          </Status>
          <Box
            sx={{
              display: 'grid',
              gap: '20px',
              '& .Task': { boxShadow: 'none', '& *': { opacity: 0, pointerEvents: 'none' } }
            }}
          >
            {column.tasks.map((task, index) => (
              <Skeleton
                key={index}
                variant='rounded'
                animation='wave'
                sx={{ background: theme => (theme.palette.__mode === 'DARK' ? 'var(--dark-grey)' : 'white') }}
              >
                <Task {...getTasksProps(task as any)} />
              </Skeleton>
            ))}
          </Box>
        </Column>
      ))}
      <Skeleton
        variant='rounded'
        animation='wave'
        sx={{
          minWidth: '280px',
          marginTop: '39px',
          background: theme => (theme.palette.__mode === 'DARK' ? 'var(--dark-grey)' : 'white')
        }}
      >
        <AddNewColumnButton role='button' aria-label='Add New Column' />
      </Skeleton>
    </BoardRoot>
  );
}
