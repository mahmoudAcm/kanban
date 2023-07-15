import { Box, Button, Dialog, DialogContent, DialogTitle, FormGroup, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import TextField from '@/src/components/inputs/TextField';
import * as yup from 'yup';
import { ArrayHelpers, FieldArray, Form, Formik } from 'formik';
import CloseIcon from '@/src/icons/CloseIcon';

const schema = yup.object({
  name: yup.string().required("Can't be blank"),
  columns: yup.array().of(yup.string().max(70, 'Must be at most 70 characters').required("Can't be blank"))
});

type DialogType = 'create' | 'edit' | undefined;

export default function BoardDialog() {
  const [open, setOpen] = useState(true);
  const type = 'create' as DialogType;

  const initialValues =
    type === 'create'
      ? { name: '', columns: ['Todo', 'Doing'] }
      : {
          name: 'Platform Launch',
          columns: ['Todo', 'Doing', 'Done']
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
        <Typography variant='h2'>{type === 'create' ? 'Add New' : 'Edit'} Board</Typography>
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
                            sx={{ mt: index === 0 ? '16px' : 0, mr: '-8px', '&:hover rect': { fill: 'var(--red)' } }}
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
