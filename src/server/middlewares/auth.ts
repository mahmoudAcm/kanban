import { getAuth } from '@clerk/nextjs/server';
import { NextApiRequest } from 'next';
import { HTTPNotAuthorizedError } from '@/src/server/libs/customErrors';

export default function isAuthenticated(req: NextApiRequest) {
  const { userId } = getAuth(req);

  if (!userId) throw new HTTPNotAuthorizedError();

  return userId;
}
