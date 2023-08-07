import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/src/libs/prisma';
import { Prisma } from '@prisma/client';
import isAuthenticated from '@/src/server/middlewares/auth';
import { HTTPNotAuthorizedError } from '@/src/server/libs/customErrors';

export async function toggleSubtask(req: NextApiRequest, res: NextApiResponse) {
  try {
    const subtaskId = req.query.subtaskId as string;

    const userId = isAuthenticated(req);

    const oldSubtask = await prisma.subTask.findUniqueOrThrow({ where: { id: subtaskId, userId } });
    await prisma.subTask.update({ data: { isCompleted: !oldSubtask.isCompleted }, where: { id: subtaskId, userId } });

    res.json({ message: `Subtask is marked as ${!oldSubtask.isCompleted ? 'completed' : 'uncompleted'}.` });
  } catch (error: any) {
    if (error instanceof HTTPNotAuthorizedError) return res.status(401).json(error.getError());
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return res
        .status(error.code === 'P2025' ? 404 : 400)
        .json({ message: error.meta?.cause ?? 'The subtask was not found.' });
    res.status(400).json({ message: error.message });
  }
}
