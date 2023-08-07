import { SignIn } from '@clerk/clerk-react';
import { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import AuthLayout from '@/src/components/layouts/AuthLayout';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';

function Signin() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn && isLoaded) router.reload();
  }, [router, isSignedIn, isLoaded]);

  return <SignIn redirectUrl='/boards' />;
}

Signin.guestGuard = true;

Signin.getLayout = (page: ReactNode) => (
  <AuthLayout>
    <Head>
      <title>Kanban - Sign In to Streamline Your Task Management</title>
    </Head>
    {page}
  </AuthLayout>
);

export default Signin;
