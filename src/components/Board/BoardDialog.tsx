import { Box, Button, Dialog, DialogContent, DialogTitle, FormGroup, IconButton, Typography } from '@mui/material';
import TextField from '@/src/components/inputs/TextField';
import * as yup from 'yup';
import { ArrayHelpers, FieldArray, Form, Formik } from 'formik';
import CloseIcon from '@/src/icons/CloseIcon';
import { useAppDispatch } from '@/src/store';
import useDialogsSelector from '@/src/hooks/useDialogsSelector';
import { DIALOG_IDS } from '@/src/constants';
import { dialogsActions } from '@/src/slices/dialogs';
import { boardsActions } from '@/src/slices/boards';
import useBoardsSelector from '@/src/hooks/useBoardsSelector';

const schema = yup.object({
  name: yup.string().required("Can't be blank"),
  columns: yup.array().of(yup.string().max(70, 'Must be at most 70 characters').required("Can't be blank"))
});

export default function BoardDialog() {
  const dispatch = useAppDispatch();
  const {
    [DIALOG_IDS.BOARD_DIALOG]: { show, type }
  } = useDialogsSelector();
  const boards = useBoardsSelector<'boards'>(({ boards }) => boards);
  const activeBoardId = useBoardsSelector<'activeBoardId'>(({ activeBoardId }) => activeBoardId);

  const board = boards[activeBoardId];

  const initialValues =
    type === 'create'
      ? { name: '', columns: ['Todo', 'Doing'] }
      : {
          name: board.name,
          columns: board.columns.map(({ name }) => name)
        };

  return (
    <Dialog
      open={show}
      fullWidth
      onClose={() => {
        dispatch(dialogsActions.closeDialog(DIALOG_IDS.BOARD_DIALOG));
      }}
    >
      <DialogTitle>
        <Typography variant='h2'>{type === 'create' ? 'Add New' : 'Edit'} Board</Typography>
      </DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={async (values, actions) => {
          if (type === 'create')
            await dispatch(
              boardsActions.apiAddBoard({
                ...values,
                columns: values.columns.map(column => ({ name: column }))
              })
            );
          // console.log(values);
        }}
      >
        {props => (
          <Form>
            <DialogContent sx={{ mt: '24px' }}>
              <TextField
                label='Name'
                placeholder='e.g. Web Design'
                fullWidth
                error={!!props.errors.name && props.touched.name}
                helperText={props.errors.name}
                inputProps={props.getFieldProps('name')}
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
                            inputProps={props.getFieldProps(`columns.${index}`)}
                            error={!!props.errors.columns?.[index] && !!(props.touched.columns as any)?.[index]}
                            helperText={props.errors.columns?.[index]}
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
                    >
                      + Add New Column
                    </Button>
                  </FormGroup>
                )}
              />
              <Button size='small' fullWidth type='submit'>
                {type === 'create' ? 'Create New Board' : 'Save Changes'}
              </Button>
            </DialogContent>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
