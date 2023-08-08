import { SignUp } from '@clerk/clerk-react';
import { ReactNode } from 'react';
import Head from 'next/head';
import AuthLayout from '@/src/components/layouts/AuthLayout';
import { clerkAppearanceElements } from '@/src/components/Auth/clerkStyles';

function Signup() {
  return (
    <SignUp
      redirectUrl='/boards'
      appearance={{
        layout: {
          logoImageUrl: '/images/auth/favicon.svg'
        },
        elements: clerkAppearanceElements
      }}
    />
  );
}

Signup.guestGuard = true;

Signup.getLayout = (page: ReactNode) => (
  <AuthLayout>
    <Head>
      <link rel='shortcut icon' href='/images/auth/favicon.svg' />
      <title>Kanban - Create Your Kanban Task Management Account</title>
    </Head>
    {page}
  </AuthLayout>
);

export default Signup;
