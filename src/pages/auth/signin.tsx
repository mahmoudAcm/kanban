import { SignIn } from '@clerk/clerk-react';
import { ReactNode } from 'react';
import Head from 'next/head';
import AuthLayout from '@/src/components/layouts/AuthLayout';
import { clerkAppearanceElements } from '@/src/components/Auth/clerkStyles';

function Signin() {
  return (
    <SignIn
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

Signin.guestGuard = true;

Signin.getLayout = (page: ReactNode) => (
  <AuthLayout>
    <Head>
      <link rel='shortcut icon' href='/images/auth/favicon.svg' />
      <title>Kanban - Sign In to Streamline Your Task Management</title>
    </Head>
    {page}
  </AuthLayout>
);

export default Signin;
