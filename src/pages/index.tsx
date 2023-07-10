import Head from 'next/head';
import { Box, Button, Container, MenuItem, Typography } from '@mui/material';
import DestructiveButton from '@/src/components/buttons/DestructiveButton';
import TextField from '@/src/components/inputs/TextField';
import DropDown from '@/src/components/inputs/DropDown';
import { MouseEventHandler, useState } from 'react';

function Home() {
  const [selectValue, setSelectValue] = useState('Doing');

  const onSelect: MouseEventHandler<HTMLLIElement> = evt => {
    setSelectValue(evt.currentTarget.dataset.value!);
  };

  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Typography variant='h1'>Heading (XL)</Typography>
      <Typography variant='h2'>Heading (L)</Typography>
      <Typography variant='h3'>Heading (M)</Typography>
      <Typography variant='h4'>Heading (S)</Typography>
      <Typography variant='body1' sx={{ maxWidth: '635px' }}>
        Body (L) - Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet
        nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin
        laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo.
        Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu
        augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est.
      </Typography>
      <Typography variant='body2' sx={{ maxWidth: '635px' }}>
        Body (M) - - Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet
        nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin
        laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo.
        Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu
        augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est.
      </Typography>
      <Button size='large'>Button Primary (L)</Button>
      <Button size='small'>Button Primary (S)</Button>
      <Button size='small' color='secondary'>
        Button Primary (S)
      </Button>
      <DestructiveButton size='small'>Button Destructive</DestructiveButton>
      <Box sx={{ display: 'grid', gap: '20px', my: '100px' }}>
        <TextField label='Text Field (Idle)' placeholder='Enter task name' fullWidth />
        <TextField label='Text Field (Active)' value='Building a slideshow' fullWidth helperText="this can't happen" />
        <TextField
          label='Text Field (Error)'
          placeholder='Enter task name'
          error
          fullWidth
          helperText='Can’t be empty'
        />
        <TextField
          label='Text Area (Error)'
          placeholder='Enter task name'
          fullWidth
          multiline
          error
          helperText='cjdhfkjdshf'
          rows={4}
        />
      </Box>
      <Box
        sx={{
          display: 'grid',
          gap: '20px',
          my: '200px',
          // background: 'var(--dark-grey)',
          height: '500px',
          padding: '24px'
        }}
      >
        <DropDown label='Dropdown (Idle)' value={selectValue}>
          <MenuItem value='Todo'>Todo</MenuItem>
          <MenuItem value='Doing'>Doing</MenuItem>
          <MenuItem value='Done'>Done</MenuItem>
        </DropDown>
        <DropDown label='Dropdown (Active)' value={selectValue}>
          <MenuItem value='Todo' onClick={onSelect}>
            Todo
          </MenuItem>
          <MenuItem value='Doing' onClick={onSelect}>
            Doing
          </MenuItem>
          <MenuItem value='Done' onClick={onSelect}>
            Done
          </MenuItem>
        </DropDown>
      </Box>
    </Container>
  );
}

Home.authGuard = process.env.NODE_ENV === 'production';

export default Home;
