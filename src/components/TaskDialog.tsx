import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormGroup,
  IconButton,
  MenuItem,
  Typography
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
import { useMemo } from 'react';
import $sleep from '@/src/libs/$sleep';

const schema = yup.object({
  title: yup.string().required("Can't be blank"),
  description: yup.string().optional(),
  subtasks: yup.array().of(yup.string().max(500, 'Must be at most 500 characters').required("Can't be blank")),
  status: yup.string().required("Can't be blank")
});

export default function TaskDialog() {
  const dispatch = useAppDispatch();
  const {
    [DIALOG_IDS.TASK_DIALOG]: { show, type }
  } = useDialogsSelector();
  const board = useBoardsSelector(({ boards, activeBoardId }) => boards[activeBoardId]);
  const task = useTasksSelector(({ tasks, activeTaskId }) => tasks[activeTaskId]);

  const status = useMemo(() => {
    const columns = board?.columns;
    const columnId = task?.columnId;
    return columns?.find(column => column.id == columnId)?.name ?? '';
  }, [board, task]);

  if (!board?.columns.length) return <></>;

  const initialValues =
    type === 'create'
      ? {
          title: '',
          description: '',
          subtasks: ['', ''],
          status: board?.columns?.[0].name
        }
      : {
          title: task?.title ?? '',
          description: task?.description ?? '',
          subtasks: task?.subtasks.map(subtask => subtask.title) ?? [],
          status
        };

  async function handleSubmit<Values = typeof initialValues>(values: Values, actions: FormikHelpers<Values>) {
    actions.setSubmitting(true);
    await $sleep(5000);
    actions.setSubmitting(false);
  }

  return (
    <Dialog
      open={show}
      fullWidth
      onClose={() => {
        dispatch(dialogsActions.closeDialog(DIALOG_IDS.TASK_DIALOG));
      }}
    >
      <DialogTitle>
        <Typography variant='h2'>{type === 'create' ? 'Add New' : 'Edit'} Task</Typography>
      </DialogTitle>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
        {props => (
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
                            inputProps={props.getFieldProps(`subtasks.${index}`)}
                            error={!!props.errors.subtasks?.[index] && !!(props.touched.subtasks as any)?.[index]}
                            helperText={props.errors.subtasks?.[index]}
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
                        arrayHelpers.push('');
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
                value={props.values.status}
                sx={{ mb: '24px' }}
                disabled={props.isSubmitting}
              >
                {board?.columns.map(column => (
                  <MenuItem
                    key={column.id}
                    value={column.name}
                    onClick={() => props.getFieldHelpers('status').setValue(column.name)}
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
        )}
      </Formik>
    </Dialog>
  );
}
