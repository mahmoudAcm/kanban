import { useMemo, useState } from 'react';
import { Box, DialogContent, DialogTitle, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import DropDown from '@/src/components/inputs/DropDown';
import { Form, Formik, FormikHelpers } from 'formik';
import Subtask from '@/src/components/Task/Subtask';
import VerticalDotsIcon from '@/src/icons/VerticalDotsIcon';
import { useAppDispatch } from '@/src/store';
import useDialogsSelector from '@/src/hooks/useDialogsSelector';
import { DIALOG_IDS } from '@/src/constants';
import { dialogsActions } from '@/src/slices/dialogs';
import useTasksSelector from '@/src/hooks/useTasksSelector';
import useBoardsSelector from '@/src/hooks/useBoardsSelector';
import { getTasksProps } from '@/src/components/Task/Task';
import AnimatedDialog from '@/src/components/Dialogs/AnimatedDialog';
import { tasksActions } from '@/src/slices/tasks';
import $toast, { $toastify } from '@/src/libs/$toast';
import { AxiosError } from 'axios';

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
  }, [board, task?.columnId]);

  if (!task) return <></>;

  const isMenuOpen = Boolean(anchorEl);
  const taskProps = getTasksProps(task);

  const initialValues = {
    currentStatus: { status, columnId: task?.columnId }
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const toggleSubtask = (id: string) => async () => {
    try {
      await dispatch(tasksActions.apiToggleSubtask(board?.id!, task?.columnId, task?.id, id));
    } catch (error) {
      let toastId: any;

      if (error instanceof AxiosError && error.response?.status === 401) {
        toastId = $toast(
          'You do not have permission to toggle this subtask. Please log in or check your credentials.',
          {
            type: 'error',
            onClose: () => {
              $toastify.dismiss(toastId);
            }
          }
        );
        return;
      }

      toastId = $toast('Oops! Something went wrong while toggling subtasks. Please try again later.', {
        type: 'error',
        onClose: () => {
          $toastify.dismiss(toastId);
        }
      });
    }
  };

  async function handleSubmit<Values extends typeof initialValues>(
    { currentStatus }: Values,
    actions: FormikHelpers<Values>
  ) {
    try {
      await dispatch(tasksActions.apiMoveTask(board?.id!, currentStatus.columnId, task!));
    } catch (error) {
      let toastId: any;

      if (error instanceof AxiosError && error.response?.status === 401) {
        toastId = $toast('You do not have permission to move the task. Please log in or check your credentials.', {
          type: 'error',
          onClose: () => {
            $toastify.dismiss(toastId);
          }
        });
        return;
      }

      toastId = $toast('Oops! Something went wrong while moving the task. Please try again later.', {
        type: 'error',
        onClose: () => {
          $toastify.dismiss(toastId);
        }
      });
    }
  }

  return (
    <AnimatedDialog
      open={show}
      fullWidth
      onClose={() => {
        $toastify.dismiss();
        $toastify.clearWaitingQueue();
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
      <Formik initialValues={initialValues} key={status} onSubmit={handleSubmit}>
        {props => (
          <Form>
            <DialogContent sx={{ mt: '24px', pb: '32px !important' }}>
              {task?.description && (
                <Typography variant='body1' sx={{ color: 'var(--medium-grey)', mb: '24px' }}>
                  {task.description}
                </Typography>
              )}
              <Box sx={{ my: '24px', display: taskProps.subtasksCount === 0 ? 'none' : undefined }}>
                <Typography variant='body2' sx={{ color: 'var(--medium-grey)' }}>
                  Subtasks ({taskProps.completedSubtasksCount} of {taskProps.subtasksCount})
                </Typography>
                <Box sx={{ display: 'grid', gap: '8px', mt: '16px' }}>
                  {task?.subtasks.map(subtask => (
                    <Subtask
                      key={subtask.id}
                      title={subtask.title}
                      checked={subtask.isCompleted}
                      onChange={toggleSubtask(subtask.id)}
                    />
                  ))}
                </Box>
              </Box>
              <DropDown label='Current Status' fullWidth value={props.values.currentStatus.status}>
                {board?.columns.map(column => (
                  <MenuItem
                    key={column.id}
                    value={column.name}
                    onClick={async () => {
                      props.getFieldHelpers('currentStatus').setValue({
                        status: column.name,
                        columnId: column.id
                      });
                      await props.submitForm();
                    }}
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
        <MenuItem
          sx={{ color: 'var(--red)' }}
          onClick={() => {
            dispatch(dialogsActions.showDialog({ id: DIALOG_IDS.DELETE_TASK_DIALOG }));
            closeMenu();
          }}
        >
          Delete Task
        </MenuItem>
      </Menu>
    </AnimatedDialog>
  );
}
