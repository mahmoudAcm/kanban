import { Fragment, memo } from 'react';
import useTasksSelector from '@/src/hooks/useTasksSelector';
import { Box, styled, Typography } from '@mui/material';
import Task, { getTasksProps } from '@/src/components/Task';

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

function getStatusColor(index: number) {
  const colors = ['#49C4E5', '#8471F2', '#67E2AE', '#EB144C', '#FF6900', '#ABB8C3'];
  return colors[index % colors.length];
}

interface ListProps {
  columnName: string;
  columnId: string;
  index: number;
  tasksIds: string[];
}

function ColumnList({ index, columnName, columnId, tasksIds }: ListProps) {
  const tasks = useTasksSelector(({ tasksOf }) => tasksOf?.[columnId]);

  console.log(`Column ${index} rendered`);

  return (
    <Column>
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
        {columnName} ({tasksIds.length})
      </Status>
      <Box sx={{ display: 'grid', gap: '20px' }}>
        {tasksIds.map((taskId, index) => {
          const task = tasks?.[taskId];
          if (!task) return <Fragment key={index}></Fragment>;
          return <Task key={taskId} {...getTasksProps(task)} />;
        })}
      </Box>
    </Column>
  );
}

export default memo(ColumnList);
