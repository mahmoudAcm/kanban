// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { createBoard, getBoards } from '@/src/server/controllers/boards';

const mapMethodToController: Record<string, NextApiHandler> = {
  GET: getBoards,
  POST: createBoard
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (mapMethodToController[req.method!]) {
    const controller = mapMethodToController[req.method!];
    return controller(req, res);
  }
  res.status(501).json({ message: 'Method is not implemented' });
}
