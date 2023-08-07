import DeleteDialog from '@/src/components/Dialogs/DeleteDialog';
import useBoardsSelector from '@/src/hooks/useBoardsSelector';
import useDialogsSelector from '@/src/hooks/useDialogsSelector';
import { DIALOG_IDS } from '@/src/constants';
import { useAppDispatch } from '@/src/store';
import { dialogsActions } from '@/src/slices/dialogs';
import { boardsActions } from '@/src/slices/boards';
import { useEffect, useRef, useState } from 'react';
import $toast, { $toastify } from '@/src/libs/$toast';
import { AxiosError } from 'axios';

export default function DeleteBoardDialog() {
  const dispatch = useAppDispatch();
  const {
    [DIALOG_IDS.DELETE_BOARD_DIALOG]: { show }
  } = useDialogsSelector();
  const boardNameRef = useRef('');
  const [isSubmitting, setSubmitting] = useState(false);

  const board = useBoardsSelector(({ boards, activeBoardId }) => {
    return boards[activeBoardId];
  });

  useEffect(() => {
    if (board?.name) boardNameRef.current = board.name;
  }, [board]);

  const handleClose = () => {
    if (isSubmitting) return;
    dispatch(dialogsActions.closeDialog(DIALOG_IDS.DELETE_BOARD_DIALOG));
    $toastify.clearWaitingQueue();
    $toastify.dismiss();
  };

  return (
    <DeleteDialog
      open={!!board?.name && show}
      title='Delete this board?'
      content={`Are you sure you want to delete the ‘${boardNameRef.current}’ board? This action will remove all columns and tasks and cannot be reversed.`}
      onClose={handleClose}
      onCancel={handleClose}
      isDeleting={isSubmitting}
      onDelete={async () => {
        if (isSubmitting) return;
        setSubmitting(true);

        try {
          await dispatch(boardsActions.apiRemoveBoard(board!));
          handleClose();
        } catch (error) {
          console.log(error);

          let toastId: any;

          if (error instanceof AxiosError && error.response?.status === 401) {
            toastId = $toast(
              'You do not have permission to delete the board. Please log in or check your credentials.',
              {
                type: 'error',
                onClose: () => {
                  $toastify.dismiss(toastId);
                }
              }
            );
            return;
          }

          toastId = $toast('Oops! Something went wrong while deleting the board. Please try again later.', {
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
