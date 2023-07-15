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
import { useState } from 'react';
import { ArrayHelpers, FieldArray, Form, Formik } from 'formik';
import * as yup from 'yup';
import TextField from '@/src/components/inputs/TextField';
import CloseIcon from '@/src/icons/CloseIcon';
import DropDown from '@/src/components/inputs/DropDown';

const schema = yup.object({
  title: yup.string().required("Can't be blank"),
  description: yup.string().optional(),
  subtasks: yup.array().of(yup.string().max(70, 'Must be at most 70 characters').required("Can't be blank")),
  status: yup.string().required("Can't be blank")
});

type DialogType = 'create' | 'edit' | undefined;

export default function TaskDialog() {
  const [open, setOpen] = useState(true);
  const type = 'edit' as DialogType;

  const initialValues =
    type === 'create'
      ? {
          title: '',
          description: '',
          subtasks: ['', ''],
          status: 'Todo'
        }
      : {
          title: 'Add authentication endpoints',
          description: '',
          subtasks: ['Define user model', 'Add auth endpoints'],
          status: 'Doing'
        };

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={() => {
        setOpen(false);
      }}
    >
      <DialogTitle>
        <Typography variant='h2'>{type === 'create' ? 'Add New' : 'Edit'} Task</Typography>
      </DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          console.log(values);
        }}
      >
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
                          />
                          <IconButton
                            sx={{ mt: index === 0 ? '16px' : 0, mr: '-8px' }}
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
              <DropDown label='Status' fullWidth value={props.values.status} sx={{ mb: '24px' }}>
                <MenuItem value='Todo' onClick={() => props.getFieldHelpers('status').setValue('Todo')}>
                  Todo
                </MenuItem>
                <MenuItem value='Doing' onClick={() => props.getFieldHelpers('status').setValue('Doing')}>
                  Doing
                </MenuItem>
                <MenuItem value='Done' onClick={() => props.getFieldHelpers('status').setValue('Done')}>
                  Done
                </MenuItem>
              </DropDown>
              <Button size='small' fullWidth type='submit'>
                {type === 'create' ? 'Create Task' : 'Save Changes'}
              </Button>
            </DialogContent>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
