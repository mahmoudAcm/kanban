import { SignUp } from '@clerk/clerk-react';
import { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import AuthLayout from '@/src/components/layouts/AuthLayout';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';

function Signup() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn && isLoaded) router.reload();
  }, [router, isSignedIn, isLoaded]);

  return <SignUp redirectUrl='/boards' />;
}

Signup.guestGuard = true;

Signup.getLayout = (page: ReactNode) => (
  <AuthLayout>
    <Head>
      <title>Kanban - Create Your Kanban Task Management Account</title>
    </Head>
    {page}
  </AuthLayout>
);

export default Signup;
