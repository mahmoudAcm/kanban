import { useMemo, useState } from 'react';
import { Box, DialogContent, DialogTitle, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import DropDown from '@/src/components/inputs/DropDown';
import { Form, Formik } from 'formik';
import Subtask from '@/src/components/Subtask';
import VerticalDotsIcon from '@/src/icons/VerticalDotsIcon';
import { useAppDispatch } from '@/src/store';
import useDialogsSelector from '@/src/hooks/useDialogsSelector';
import { DIALOG_IDS } from '@/src/constants';
import { dialogsActions } from '@/src/slices/dialogs';
import useTasksSelector from '@/src/hooks/useTasksSelector';
import useBoardsSelector from '@/src/hooks/useBoardsSelector';
import { getTasksProps } from '@/src/components/Task';
import AnimatedDialog from '@/src/components/Dialogs/AnimatedDialog';

export default function ViewTaskDetailsDialog() {
  const {
    [DIALOG_IDS.VIEW_TASK_DIALOG]: { show }
  } = useDialogsSelector();
  const board = useBoardsSelector(({ boards, activeBoardId }) => boards[activeBoardId]);
  const task = useTasksSelector(({ tasks, activeTaskId }) => tasks[activeTaskId]);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const status = useMemo(() => {
    const columns = board?.columns ?? [];
    const columnId = task?.columnId ?? '';
    return columns.find(column => column.id == columnId)?.name ?? '';
  }, [board, task]);

  if (!task) return <></>;

  const isMenuOpen = Boolean(anchorEl);
  const taskProps = getTasksProps(task);

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AnimatedDialog
      open={show}
      fullWidth
      onClose={() => {
        dispatch(dialogsActions.closeDialog(DIALOG_IDS.VIEW_TASK_DIALOG));
      }}
      keepMounted
      TransitionProps={{
        direction: 'left'
      }}
    >
      <DialogTitle sx={{ display: 'flex', gap: '8.5px', alignItems: 'center' }}>
        <Typography variant='h2' sx={{ maxWidth: '387px', flex: 1 }}>
          {task?.title}
        </Typography>
        <IconButton
          aria-label='View Task Details Dialog Button'
          sx={{ mr: '-15.5px' }}
          onClick={event => {
            setAnchorEl(event.currentTarget);
          }}
        >
          <VerticalDotsIcon sx={{ width: '20px !important' }} />
        </IconButton>
      </DialogTitle>
      <Formik
        initialValues={{
          currentStatus: status
        }}
        // validationSchema={schema}
        onSubmit={(values, actions) => {
          console.log(values);
        }}
      >
        {props => (
          <Form>
            <DialogContent sx={{ mt: '24px', pb: '32px !important' }}>
              {task?.description && (
                <Typography variant='body1' sx={{ color: 'var(--medium-grey)', mb: '24px' }}>
                  {task.description}
                </Typography>
              )}
              <Box sx={{ my: '24px' }}>
                <Typography variant='body2' sx={{ color: 'var(--medium-grey)' }}>
                  Subtasks ({taskProps.completedSubtasksCount} of {taskProps.subtasksCount})
                </Typography>
                <Box sx={{ display: 'grid', gap: '8px', mt: '16px' }}>
                  {task?.subtasks.map(subtask => (
                    <Subtask key={subtask.id} title={subtask.title} checked={subtask.isCompleted} />
                  ))}
                </Box>
              </Box>
              <DropDown label='Current Status' fullWidth value={props.values.currentStatus}>
                {board?.columns.map(column => (
                  <MenuItem
                    key={column.id}
                    value={column.name}
                    onClick={() => props.getFieldHelpers('currentStatus').setValue(column.name)}
                  >
                    {column.name}
                  </MenuItem>
                ))}
              </DropDown>
            </DialogContent>
          </Form>
        )}
      </Formik>
      <Menu
        open={isMenuOpen}
        anchorEl={anchorEl}
        onClose={closeMenu}
        PaperProps={{
          sx: {
            width: '192px',
            mt: '14px',
            background: theme => (theme.palette.__mode === 'DARK' ? theme.palette.background.default : 'white')
          }
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <MenuItem
          onClick={() => {
            dispatch(dialogsActions.showDialog({ id: DIALOG_IDS.TASK_DIALOG, type: 'edit' }));
            closeMenu();
          }}
        >
          Edit Task
        </MenuItem>
        <MenuItem sx={{ color: 'var(--red)' }}>Delete Task</MenuItem>
      </Menu>
    </AnimatedDialog>
  );
}
