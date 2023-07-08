import { Box, Typography } from '@mui/material';
import AuthLayout, { divider, StyledButton } from '@/src/components/Auth/AuthLayout';
import { ReactNode, useState } from 'react';
import GoogleProvider from '@/src/components/Auth/GoogleProvider';
import Input from '@/src/components/Auth/Input';
import NextLink from 'next/link';
import Head from 'next/head';
import $sleep from '@/src/libs/$sleep';

function SignIn() {
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    await $sleep(3000);
    setSubmitting(false);
  };

  return (
    <Box>
      <GoogleProvider sx={{ mt: '44px' }} type='signIn' />
      {divider}
      <Box sx={{ display: 'grid', gap: '24px', mt: '44px' }}>
        <Input label='Email' inputProps={{ type: 'email', placeholder: 'Enter your email' }} />
        <Input label='Password' inputProps={{ type: 'password', placeholder: 'Enter your password' }} />
      </Box>
      <StyledButton fullWidth variant='contained' disableElevation onClick={handleSubmit} disabled={isSubmitting}>
        Log in
      </StyledButton>
      <Typography
        sx={{
          fontSize: '0.875rem',
          textAlign: 'center',
          mt: '24px',
          color: '121212',
          lineHeight: 1.5
        }}
      >
        Don’t have an account?{' '}
        <Box component='span' sx={{ position: 'relative', display: 'inline-block', marginBottom: '18px' }}>
          <NextLink style={{ color: 'hsla(235, 12%, 27%, 1)', fontWeight: 600, cursor: 'pointer' }} href='/auth/signup'>
            Sign up for free
          </NextLink>
          <svg
            width='132'
            height='11'
            viewBox='0 0 132 11'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            style={{ position: 'absolute', bottom: '-18px', left: '-2px' }}
          >
            <path
              d='M0.38501 7.77003C44.3866 -2.00811 131.575 2.88096 131.575 2.88096C131.575 2.88096 76.1656 3.69581 33.7937 9.39972'
              stroke='#3E3F4E'
              strokeWidth='1.62969'
            />
          </svg>
        </Box>
      </Typography>
    </Box>
  );
}

SignIn.getLayout = (page: ReactNode) => (
  <AuthLayout
    /*imageUrl='/images/auth/auth.svg'*/
    title='Welcome back, Olivia'
    subtitle='Welcome back! Please enter your details.'
  >
    <Head>
      <title>Kanban - Sign In to Streamline Your Task Management</title>
    </Head>
    {page}
  </AuthLayout>
);

export default SignIn;
