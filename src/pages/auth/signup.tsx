import { Box, Link, Typography } from '@mui/material';
import AuthLayout, { divider, StyledButton } from '@/src/components/layouts/AuthLayout';
import Input from '@/src/components/Auth/Input';
import { ReactNode, useState } from 'react';
import GoogleProvider from '@/src/components/Auth/GoogleProvider';
import NextLink from 'next/link';
import Head from 'next/head';
import $sleep from '@/src/libs/$sleep';

function Signup() {
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    await $sleep(3000);
    setSubmitting(false);
  };

  return (
    <Box>
      <GoogleProvider sx={{ mt: '44px' }} type='signUp' />
      {divider}
      <Box sx={{ display: 'grid', gap: '24px', mt: '44px' }}>
        <Input label='Name' inputProps={{ type: 'text', placeholder: 'Enter your name' }} />
        <Input label='Email' inputProps={{ type: 'email', placeholder: 'Enter your email' }} />
        <Input label='Password' inputProps={{ type: 'password', placeholder: 'Enter your password' }} />
      </Box>
      <StyledButton fullWidth variant='contained' disableElevation onClick={handleSubmit} disabled={isSubmitting}>
        Sign up
      </StyledButton>
      <Typography sx={{ fontSize: '0.875rem', textAlign: 'center', mt: '24px', color: '#121212', lineHeight: 1.5 }}>
        Already have an account?{' '}
        <Link
          component={NextLink}
          sx={{
            color: 'hsla(235, 12%, 27%, 1)',
            fontWeight: 600,
            cursor: 'pointer',
            textDecorationColor: 'currentColor'
          }}
          href='/auth/signin'
        >
          Login
        </Link>
      </Typography>
    </Box>
  );
}

Signup.getLayout = (page: ReactNode) => (
  <AuthLayout
    /*imageUrl='/images/auth/auth.svg'*/ title='Create an account'
    subtitle='Streamline Your Workflow: Create a New Account and Get Started with Our Kanban Id!'
  >
    <Head>
      <title>Kanban - Create Your Kanban Task Management Account</title>
    </Head>
    {page}
  </AuthLayout>
);

export default Signup;
