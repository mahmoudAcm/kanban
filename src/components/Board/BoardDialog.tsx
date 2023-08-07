import {
  Box,
  Button,
  CircularProgress,
  DialogContent,
  DialogTitle,
  FormGroup,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme
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
import { useCallback, useEffect, useRef, useState } from 'react';
import AnimatedDialog from '@/src/components/Dialogs/AnimatedDialog';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import $sleep from '@/src/libs/$sleep';
import $toast, { $toastify, $toastUpdate } from '@/src/libs/$toast';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';

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
  const dispatch = useAppDispatch();
  const {
    [DIALOG_IDS.BOARD_DIALOG]: { show, type }
  } = useDialogsSelector();
  const router = useRouter();
  const board = useBoardsSelector(({ boards, activeBoardId }) => boards[activeBoardId]);
  const isSubmittingRef = useRef(false);
  const scrollRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<any>(null);
  const toastIdRef = useRef<any>(null);
  const [statusCode, setStatusCode] = useState<200 | 400 | undefined>(undefined);
  const theme = useTheme();
  const isMobile = useMediaQuery(() => theme.breakpoints.down('sm'));

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

  const closeDialog = useCallback(
    function () {
      if (isSubmittingRef.current || (router.isReady && router.pathname === '/boards')) return;
      dispatch(dialogsActions.closeDialog(DIALOG_IDS.BOARD_DIALOG));
      if (toastIdRef.current) $toastify.dismiss(toastIdRef.current);
    },
    [dispatch, router]
  );

  const handleSubmit = useCallback(
    async function <Values extends typeof initialValues>(values: Values, actions: FormikHelpers<Values>) {
      if (toastIdRef.current) $toastify.dismiss(toastIdRef.current);

      toastIdRef.current = $toast(
        `Preparing the board for you. This won't take long – just a few moments of magic in progress 🎭✨`,
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

        if (type === 'create') {
          await dispatch(
            boardsActions.apiAddBoard({
              ...values,
              columns: values.columns.map(column => ({ name: column.name }))
            })
          );
          actions.resetForm();

          //if no boards were found and i'm in the boards page after i create the first board i will be redirected to the first  board route
          if (router.isReady && router.pathname === '/boards') {
            await router.reload();
          }
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

        setStatusCode(200);

        $toastUpdate(toastIdRef.current, {
          isLoading: false,
          type: 'success',
          message: `Your board has been successfully ${type === 'edit' ? 'updated' : 'created'}! 🎊`,
          onClose: closeDialog
        });
      } catch (error) {
        console.log(error);

        setStatusCode(400);

        if (error instanceof AxiosError && error.response?.status === 401) {
          $toastUpdate(toastIdRef.current, {
            isLoading: false,
            type: 'error',
            message: `You do not have permission to ${type} the board. Please log in or check your credentials.`,
            onClose: () => {
              if (toastIdRef.current) $toastify.dismiss(toastIdRef.current);
            }
          });
          return;
        }

        $toastUpdate(toastIdRef.current, {
          isLoading: false,
          type: 'error',
          message: `We regret to inform you that an error has occurred while attempting to ${type} the board.`,
          onClose: () => {
            if (toastIdRef.current) $toastify.dismiss(toastIdRef.current);
          }
        });
      } finally {
        actions.setSubmitting(false);

        isSubmittingRef.current = false;

        if (scrollRef.current) scrollRef.current.scrollTop = 0;
      }
    },
    [board?.id, closeDialog, dispatch, type, router]
  );

  useEffect(() => {
    if (show) setStatusCode(undefined);
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
      if (toastIdRef.current) $toastify.dismiss(toastIdRef.current);
    };
  }, [show]);

  return (
    <AnimatedDialog
      aria-label='Board Dialog | create/update'
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
          );
        }}
      </Formik>
    </AnimatedDialog>
  );
}
