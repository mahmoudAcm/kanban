import { Box, Typography } from '@mui/material';
import { useAppDispatch } from '@/src/store';
import { dialogsActions } from '@/src/slices/dialogs';
import { DIALOG_IDS } from '@/src/constants';

export const getTasksProps = (task: {
  title: string;
  subtasks: {
    title: string;
    isCompleted: boolean;
  }[];
}) => {
  return {
    title: task.title,
    subtasksCount: task.subtasks.length,
    completedSubtasksCount: task.subtasks.reduce((sum, subtask) => sum + +subtask.isCompleted, 0)
  };
};

interface TaskProps {
  title: string;
  subtasksCount: number;
  completedSubtasksCount: number;
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
        '& h3': {
          transition: theme => theme.transitions.create('color'),
          wordBreak: 'break-word',
          textOverflow: 'hidden'
        },
        '&:hover h3': { color: 'var(--main-purple)', cursor: 'pointer' }
      }}
    >
      <Typography
        variant='h3'
        onClick={() => {
          dispatch(dialogsActions.showDialog({ id: DIALOG_IDS.VIEW_TASK_DIALOG }));
        }}
      >
        {props.title}
      </Typography>
      <Typography variant='body2' sx={{ mt: '8px', color: 'var(--medium-grey)' }}>
        {`${props.completedSubtasksCount} of ${props.subtasksCount} subtasks`}
      </Typography>
    </Box>
  );
}
