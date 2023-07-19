// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { toggleSubtask } from '@/src/server/controllers/subtasks';

const mapMethodToController: Record<string, NextApiHandler> = {
  PATCH: toggleSubtask
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (mapMethodToController[req.method!]) {
    const controller = mapMethodToController[req.method!];
    return controller(req, res);
  }
  res.status(501).json({ message: 'Method is not implemented' });
}
