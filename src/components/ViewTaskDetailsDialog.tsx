import { useState } from 'react';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, MenuItem, Typography } from '@mui/material';
import DropDown from '@/src/components/inputs/DropDown';
import { Form, Formik } from 'formik';
import Subtask from '@/src/components/Subtask';
import VerticalDotsIcon from '@/src/icons/VerticalDotsIcon';

export default function ViewTaskDetailsDialog() {
  const [open, setOpen] = useState(true);

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={() => {
        setOpen(false);
      }}
    >
      <DialogTitle sx={{ display: 'flex', gap: '8.5px', alignItems: 'center' }}>
        <Typography variant='h2' sx={{ maxWidth: '387px' }}>
          Research pricing points of various competitors and trial different business models
        </Typography>
        <IconButton aria-label='View Task Details Dialog Button' sx={{ mr: '-15.5px' }}>
          <VerticalDotsIcon sx={{ width: '20px !important' }} />
        </IconButton>
      </DialogTitle>
      <Formik
        initialValues={{
          currentStatus: 'Doing'
        }}
        // validationSchema={schema}
        onSubmit={(values, actions) => {
          console.log(values);
        }}
      >
        {props => (
          <Form>
            <DialogContent sx={{ mt: '24px', pb: '32px !important' }}>
              <Typography variant='body1' sx={{ color: 'var(--medium-grey)', mb: '24px' }}>
                We know what we're planning to build for version one. Now we need to finalise the first pricing model
                we'll use. Keep iterating the subtasks until we have a coherent proposition.
              </Typography>
              <Box sx={{ my: '24px' }}>
                <Typography variant='body2' sx={{ color: 'var(--medium-grey)' }}>
                  Subtasks (2 of 3)
                </Typography>
                <Box sx={{ display: 'grid', gap: '8px', mt: '16px' }}>
                  <Subtask title='Research competitor pricing and business models' checked />
                  <Subtask title='Outline a business model that works for our solution' checked />
                  <Subtask title='Talk to potential customers about our proposed solution and ask for fair price expectancy' />
                </Box>
              </Box>
              <DropDown label='Current Status' fullWidth value={props.values.currentStatus}>
                <MenuItem value='Todo' onClick={() => props.getFieldHelpers('currentStatus').setValue('Todo')}>
                  Todo
                </MenuItem>
                <MenuItem value='Doing' onClick={() => props.getFieldHelpers('currentStatus').setValue('Doing')}>
                  Doing
                </MenuItem>
                <MenuItem value='Done' onClick={() => props.getFieldHelpers('currentStatus').setValue('Done')}>
                  Done
                </MenuItem>
              </DropDown>
            </DialogContent>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
