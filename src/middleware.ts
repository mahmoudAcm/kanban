import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  afterAuth(auth, req) {
    if (!auth.userId && auth.isApiRoute) {
      return NextResponse.next();
    }

    const redirectTo = req.nextUrl.origin + '/boards';

    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: redirectTo });
    }

    if (auth.userId && req.nextUrl.pathname.startsWith('/auth')) {
      const appUrl = new URL('/boards', redirectTo);
      return NextResponse.redirect(appUrl);
    }
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
};
