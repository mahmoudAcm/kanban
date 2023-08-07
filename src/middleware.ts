import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  afterAuth(auth, req) {
    if (!auth.userId && auth.isApiRoute) {
      return NextResponse.next();
    }

    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (auth.userId && req.nextUrl.pathname.startsWith('/auth')) {
      const appUrl = new URL('/boards', req.url);
      return NextResponse.redirect(appUrl);
    }
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
};
