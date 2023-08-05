import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormGroup,
  IconButton,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { ArrayHelpers, FieldArray, Form, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import TextField from '@/src/components/inputs/TextField';
import CloseIcon from '@/src/icons/CloseIcon';
import DropDown from '@/src/components/inputs/DropDown';
import { useAppDispatch } from '@/src/store';
import useDialogsSelector from '@/src/hooks/useDialogsSelector';
import { DIALOG_IDS } from '@/src/constants';
import { dialogsActions } from '@/src/slices/dialogs';
import useTasksSelector from '@/src/hooks/useTasksSelector';
import useBoardsSelector from '@/src/hooks/useBoardsSelector';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import $sleep from '@/src/libs/$sleep';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import $toast, { $toastify, $toastUpdate } from '@/src/libs/$toast';
import { tasksActions } from '@/src/slices/tasks';

const schema = yup.object({
  title: yup.string().min(3, 'Must be at least 3 characters').required("Can't be blank"),
  description: yup.string().optional(),
  subtasks: yup.array().of(
    yup.object({
      title: yup
        .string()
        .min(3, 'Must be at least 3 characters')
        .max(500, 'Must be at most 500 characters')
        .required("Can't be blank")
    })
  ),
  status: yup.object({
    name: yup.string().required("Can't be blank")
  })
});

export default function TaskDialog() {
  const dispatch = useAppDispatch();
  const {
    [DIALOG_IDS.TASK_DIALOG]: { show, type }
  } = useDialogsSelector();
  const board = useBoardsSelector(({ boards, activeBoardId }) => boards[activeBoardId]);
  const task = useTasksSelector(({ tasks, activeTaskId }) => tasks[activeTaskId]);
  const isSubmittingRef = useRef(false);
  const scrollRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<any>(null);
  const toastIdRef = useRef<any>(null);
  const [statusCode, setStatusCode] = useState<200 | 400 | undefined>(undefined);
  const theme = useTheme();
  const isMobile = useMediaQuery(() => theme.breakpoints.down('sm'));

  const status = useMemo(() => {
    const columns = board?.columns;
    const columnId = task?.columnId;
    return columns?.find(column => column.id == columnId)?.name ?? '';
  }, [board, task]);

  const initialValues =
    type === 'create'
      ? {
          title: '',
          description: '',
          subtasks: [{ title: '' }, { title: '' }],
          status: { name: board?.columns?.[0]?.name, columnId: board?.columns?.[0]?.id }
        }
      : {
          title: task?.title ?? '',
          description: task?.description ?? '',
          subtasks: task?.subtasks ?? [],
          status: { name: status, columnId: task?.columnId }
        };

  const closeDialog = useCallback(
    function () {
      if (isSubmittingRef.current) return;
      dispatch(dialogsActions.closeDialog(DIALOG_IDS.TASK_DIALOG));
      if (toastIdRef.current) $toastify.dismiss(toastIdRef.current);
    },
    [dispatch]
  );

  async function handleSubmit<Values extends typeof initialValues>(values: Values, actions: FormikHelpers<Values>) {
    if (toastIdRef.current) $toastify.dismiss(toastIdRef.current);

    toastIdRef.current = $toast(
      `Preparing the task for you. This won't take long – just a few moments of magic in progress 🎭✨`,
      {
        type: 'default',
        isLoading: true
      }
    );

    try {
      actions.setSubmitting(true);
      isSubmittingRef.current = true;

      //using a small delay so that animation looks petter not glitches
      timeoutRef.current = await $sleep(700);
      const { status, ...data } = values;

      if (type === 'create') {
        await dispatch(tasksActions.apiAddTask(board?.id!, status.columnId!, data));
        actions.resetForm();
      }

      if (type === 'edit') {
        await dispatch(tasksActions.apiUpdateTask(board?.id!, status.columnId!, task?.id!, data));
      }

      setStatusCode(200);

      $toastUpdate(toastIdRef.current, {
        isLoading: false,
        type: 'success',
        message: `Your task has been successfully ${type === 'edit' ? 'updated' : 'created'}! 🎊`,
        onClose: closeDialog
      });
    } catch (error) {
      console.log(error);

      setStatusCode(400);

      $toastUpdate(toastIdRef.current, {
        isLoading: false,
        type: 'error',
        message: `We regret to inform you that an error has occurred while attempting to ${type} the task.`,
        onClose: () => {
          if (toastIdRef.current) $toastify.dismiss(toastIdRef.current);
        }
      });
    } finally {
      actions.setSubmitting(false);

      isSubmittingRef.current = false;

      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }
  }

  useEffect(() => {
    if (show) setStatusCode(undefined);
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
      if (toastIdRef.current) $toastify.dismiss(toastIdRef.current);
    };
  }, [show]);

  if (!board?.columns.length) return <></>;

  return (
    <Dialog
      open={show}
      fullWidth
      onClose={closeDialog}
      sx={{
        '& .ps__rail-y': {
          background: 'transparent !important'
        },
        '& .ps__thumb-y': {
          width: '7px !important',
          background: 'var(--medium-grey) !important',
          right: 3,
          borderRadius: 3
        }
      }}
    >
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
        {props => {
          if (props.isSubmitting && !isMobile)
            return (
              <>
                <DialogTitle />
                <DialogContent sx={{ display: 'grid', height: '300px' }}>
                  <CircularProgress sx={{ m: 'auto', color: 'var(--main-purple)' }} disableShrink />
                </DialogContent>
              </>
            );
          if (statusCode === 200 || props.isSubmitting) return <></>;
          return (
            <PerfectScrollbar
              style={{ maxHeight: '100%' }}
              options={{
                suppressScrollX: true
              }}
              containerRef={container => (scrollRef.current = container)}
            >
              <DialogTitle>
                <Typography variant='h2'>{type === 'create' ? 'Add New' : 'Edit'} Task</Typography>
              </DialogTitle>
              <Form>
                <DialogContent sx={{ mt: '24px' }}>
                  <TextField
                    label='Title'
                    placeholder='e.g. Take coffee break'
                    fullWidth
                    error={!!props.errors.title && props.touched.title}
                    helperText={props.errors.title}
                    inputProps={props.getFieldProps('title')}
                    disabled={props.isSubmitting}
                  />
                  <TextField
                    label='Description'
                    placeholder='e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.'
                    fullWidth
                    error={!!props.errors.description && props.touched.description}
                    helperText={props.errors.description}
                    multiline
                    inputProps={props.getFieldProps('description')}
                    rows={4}
                    sx={{
                      mt: '24px',
                      '& textarea': {
                        height: '95.17px !important'
                      }
                    }}
                    disabled={props.isSubmitting}
                  />
                  <FieldArray
                    name='subtasks'
                    render={(arrayHelpers: ArrayHelpers) => (
                      <FormGroup sx={{ gap: '12px', my: '24px' }}>
                        {props.values.subtasks && props.values.subtasks.length > 0 ? (
                          props.values.subtasks.map((column, index) => (
                            <Box key={index} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <TextField
                                key={index}
                                label={index === 0 ? 'Subtasks' : undefined}
                                placeholder='e.g. Make coffee'
                                fullWidth
                                inputProps={props.getFieldProps(`subtasks.${index}.title`)}
                                error={
                                  //@ts-ignore
                                  !!props.errors.subtasks?.[index]?.title && !!(props.touched.subtasks as any)?.[index]
                                }
                                helperText={
                                  //@ts-ignore
                                  props.errors.subtasks?.[index]?.title
                                }
                                disabled={props.isSubmitting}
                              />
                              <IconButton
                                sx={{
                                  mt: index === 0 ? '16px' : 0,
                                  mr: '-8px',
                                  '&:hover rect': { fill: 'var(--red)' }
                                }}
                                onClick={() => {
                                  arrayHelpers.remove(index);
                                }}
                                disabled={props.isSubmitting}
                              >
                                <CloseIcon />
                              </IconButton>
                            </Box>
                          ))
                        ) : (
                          <></>
                        )}
                        <Button
                          size='small'
                          color='secondary'
                          fullWidth
                          onClick={() => {
                            arrayHelpers.push({ title: '' });
                          }}
                          disabled={props.isSubmitting}
                        >
                          + Add New Column
                        </Button>
                      </FormGroup>
                    )}
                  />
                  <DropDown
                    label='Status'
                    fullWidth
                    value={props.values.status.name}
                    sx={{ mb: '24px' }}
                    disabled={props.isSubmitting}
                  >
                    {board?.columns.map(column => (
                      <MenuItem
                        key={column.id}
                        value={column.name}
                        onClick={() =>
                          props.getFieldHelpers('status').setValue({
                            name: column.name,
                            columnId: column.id
                          })
                        }
                      >
                        {column.name}
                      </MenuItem>
                    ))}
                  </DropDown>
                  <Button size='small' fullWidth type='submit' disabled={props.isSubmitting}>
                    {type === 'create' ? 'Create Task' : 'Save Changes'}
                  </Button>
                </DialogContent>
              </Form>
            </PerfectScrollbar>
          );
        }}
      </Formik>
    </Dialog>
  );
}
