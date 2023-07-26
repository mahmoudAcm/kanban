import {
  Alert,
  AlertColor,
  Box,
  Button,
  DialogContent,
  DialogTitle,
  FormGroup,
  IconButton,
  Typography
} from '@mui/material';
import TextField from '@/src/components/inputs/TextField';
import * as yup from 'yup';
import { ArrayHelpers, FieldArray, Form, Formik, FormikHelpers } from 'formik';
import CloseIcon from '@/src/icons/CloseIcon';
import { useAppDispatch } from '@/src/store';
import useDialogsSelector from '@/src/hooks/useDialogsSelector';
import { DIALOG_IDS } from '@/src/constants';
import { dialogsActions } from '@/src/slices/dialogs';
import { boardsActions } from '@/src/slices/boards';
import useBoardsSelector from '@/src/hooks/useBoardsSelector';
import { useEffect, useId, useRef, useState } from 'react';
import AnimatedDialog from '@/src/components/Dialogs/AnimatedDialog';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

const schema = yup.object({
  name: yup.string().required("Can't be blank").min(3, 'Must be at least 3 characters.'),
  columns: yup.array().of(
    yup.object({
      id: yup.string(),
      name: yup
        .string()
        .required("Can't be blank")
        .min(3, 'Must be at least 3 characters.')
        .max(70, 'Must be at most 70 characters')
    })
  )
});

export default function BoardDialog() {
  const id = useId();
  const dispatch = useAppDispatch();
  const {
    [DIALOG_IDS.BOARD_DIALOG]: { show, type }
  } = useDialogsSelector();
  const board = useBoardsSelector(({ boards, activeBoardId }) => boards[activeBoardId]);
  const isSubmittingRef = useRef(false);
  const [alertProps, setAlertProps] = useState({
    message: '',
    severity: 'info' as AlertColor
  });
  const scrollRef = useRef<HTMLElement | null>(null);

  const initialValues =
    type === 'create'
      ? {
          name: '',
          columns: [
            { id: '', name: 'Todo' },
            { id: '', name: 'Doing' }
          ]
        }
      : {
          name: board?.name ?? '',
          columns: board?.columns.map(({ boardId, tasks, ...rest }) => rest) ?? []
        };

  useEffect(() => {
    setAlertProps({ severity: 'info', message: '' });
  }, [show]);

  async function handleSubmit<Values extends typeof initialValues>(values: Values, actions: FormikHelpers<Values>) {
    try {
      actions.setSubmitting(true);
      isSubmittingRef.current = true;
      setAlertProps({ severity: 'info', message: '' });

      if (type === 'create') {
        await dispatch(
          boardsActions.apiAddBoard({
            ...values,
            columns: values.columns.map(column => ({ name: column.name }))
          })
        );
        actions.resetForm();
      }

      if (type === 'edit') {
        await dispatch(
          boardsActions.apiUpdateBoard({
            id: board?.id ?? '',
            ...values,
            columns: values.columns.map(column => ({
              name: column.name,
              id: column.id
            }))
          })
        );
      }

      setAlertProps({
        severity: 'success',
        message: `Your board has been successfully ${type === 'create' ? type + 'd' : 'edited'}! 🎊`
      });
    } catch (error) {
      console.log(error);
      setAlertProps({
        severity: 'error',
        message: `We regret to inform you that an error has occurred while attempting to ${type} the board.`
      });
    } finally {
      actions.setSubmitting(false);
      isSubmittingRef.current = false;
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }
  }

  return (
    <AnimatedDialog
      open={show}
      fullWidth
      onClose={() => {
        if (!isSubmittingRef.current) dispatch(dialogsActions.closeDialog(DIALOG_IDS.BOARD_DIALOG));
      }}
      keepMounted
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
      <Formik initialValues={initialValues} validationSchema={schema} key={show + id} onSubmit={handleSubmit}>
        {props => (
          <PerfectScrollbar
            style={{ maxHeight: '100%' }}
            options={{
              suppressScrollX: true
            }}
            containerRef={container => (scrollRef.current = container)}
          >
            <DialogTitle>
              {alertProps.message && (
                <Alert
                  {...alertProps}
                  variant='standard'
                  sx={{ m: '0 !important', mb: '24px !important', width: '100% !important' }}
                >
                  <Typography variant='h3'>{alertProps.message}</Typography>
                </Alert>
              )}
              <Typography variant='h2'>{type === 'create' ? 'Add New' : 'Edit'} Board</Typography>
            </DialogTitle>
            <Form>
              <DialogContent sx={{ mt: '24px' }}>
                <TextField
                  label='Name'
                  placeholder='e.g. Web Design'
                  fullWidth
                  error={!!props.errors.name && props.touched.name}
                  helperText={props.errors.name}
                  inputProps={props.getFieldProps('name')}
                  disabled={props.isSubmitting}
                />
                <FieldArray
                  name='columns'
                  render={(arrayHelpers: ArrayHelpers) => (
                    <FormGroup sx={{ gap: '12px', my: '24px' }}>
                      {props.values.columns && props.values.columns.length > 0 ? (
                        props.values.columns.map((column, index) => (
                          <Box key={index} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <TextField
                              key={index}
                              label={index === 0 ? 'Columns' : undefined}
                              placeholder='e.g. Web Design'
                              fullWidth
                              inputProps={props.getFieldProps(`columns.${index}.name`)}
                              error={
                                //@ts-ignore
                                !!props.errors.columns?.[index]?.name && !!(props.touched.columns as any)?.[index]
                              }
                              helperText={
                                //@ts-ignore
                                props.errors.columns?.[index]?.name
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
                          arrayHelpers.push({ name: '' });
                        }}
                        disabled={props.isSubmitting}
                      >
                        + Add New Column
                      </Button>
                    </FormGroup>
                  )}
                />
                <Button size='small' fullWidth type='submit' disabled={props.isSubmitting}>
                  {type === 'create' ? 'Create New Board' : 'Save Changes'}
                </Button>
              </DialogContent>
            </Form>
          </PerfectScrollbar>
        )}
      </Formik>
    </AnimatedDialog>
  );
}
