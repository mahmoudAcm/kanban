import { Box, Typography } from '@mui/material';
import { useAppDispatch } from '@/src/store';
import { dialogsActions } from '@/src/slices/dialogs';
import { DIALOG_IDS } from '@/src/constants';
import { tasksActions } from '@/src/slices/tasks';

export const getTasksProps = (task: {
  id: string;
  title: string;
  subtasks: {
    title: string;
    isCompleted: boolean;
  }[];
  columnId: string;
}) => {
  return {
    id: task.id,
    title: task.title,
    subtasksCount: task.subtasks.length,
    completedSubtasksCount: task.subtasks.reduce((sum, subtask) => sum + +subtask.isCompleted, 0),
    columnId: task.columnId
  };
};

interface TaskProps {
  id: string;
  title: string;
  subtasksCount: number;
  completedSubtasksCount: number;
  columnId: string;
}

export default function Task(props: TaskProps) {
  const dispatch = useAppDispatch();

  return (
    <Box
      className='Task'
      sx={{
        width: '280px',
        p: '23px 16px',
        background: theme => (theme.palette.__mode === 'DARK' ? 'var(--dark-grey)' : 'white'),
        boxShadow: '0px 4px 6px 0px rgba(54, 78, 126, 0.10)',
        borderRadius: '8px',
        userSelect: 'none',
        '& h3': {
          transition: theme => theme.transitions.create('color'),
          wordBreak: 'break-word',
          textOverflow: 'hidden'
        },
        '&:hover, &:hover h3': { color: 'var(--main-purple)', cursor: 'pointer' }
      }}
      onClick={() => {
        dispatch(dialogsActions.showDialog({ id: DIALOG_IDS.VIEW_TASK_DIALOG }));
        dispatch(tasksActions.setActiveTaskId({ id: props.id, columnId: props.columnId }));
      }}
    >
      <Typography variant='h3'>{props.title}</Typography>
      <Typography variant='body2' sx={{ mt: '8px', color: 'var(--medium-grey)' }}>
        {`${props.completedSubtasksCount} of ${props.subtasksCount} subtasks`}
      </Typography>
    </Box>
  );
}
