import DeleteDialog from '@/src/components/Dialogs/DeleteDialog';
import useBoardsSelector from '@/src/hooks/useBoardsSelector';
import useDialogsSelector from '@/src/hooks/useDialogsSelector';
import { DIALOG_IDS } from '@/src/constants';
import { useAppDispatch } from '@/src/store';
import { dialogsActions } from '@/src/slices/dialogs';
import { useEffect, useRef, useState } from 'react';
import useTasksSelector from '@/src/hooks/useTasksSelector';
import { tasksActions } from '@/src/slices/tasks';
import $toast, { $toastify } from '@/src/libs/$toast';

export default function DeleteTaskDialog() {
  const dispatch = useAppDispatch();
  const {
    [DIALOG_IDS.DELETE_TASK_DIALOG]: { show }
  } = useDialogsSelector();
  const taskNameRef = useRef('');
  const [isSubmitting, setSubmitting] = useState(false);
  const task = useTasksSelector(({ tasks, activeTaskId }) => {
    return tasks[activeTaskId];
  });
  const boardId = useBoardsSelector(({ boards, activeBoardId }) => boards[activeBoardId]?.id);

  useEffect(() => {
    if (task?.title) taskNameRef.current = task.title;
  }, [task]);

  const handleClose = () => {
    if (isSubmitting) return;
    dispatch(dialogsActions.closeDialog(DIALOG_IDS.DELETE_TASK_DIALOG));
    $toastify.clearWaitingQueue();
    $toastify.dismiss();
  };

  return (
    <DeleteDialog
      open={!!task?.title && show}
      title='Delete this task?'
      content={`Are you sure you want to delete the ‘${taskNameRef.current}’ task and its subtasks? This action cannot be reversed.`}
      onClose={handleClose}
      onCancel={handleClose}
      isDeleting={isSubmitting}
      onDelete={async () => {
        if (isSubmitting) return;
        setSubmitting(true);

        try {
          await dispatch(tasksActions.apiRemoveTask(boardId!, task?.columnId!, task?.id!));
          handleClose();
        } catch (error) {
          console.log(error);
          const toastId = $toast('Oops! Something went wrong while deleting the task. Please try again later.', {
            type: 'error',
            onClose: () => {
              $toastify.dismiss(toastId);
            }
          });
        } finally {
          setSubmitting(false);
        }
      }}
    />
  );
}
