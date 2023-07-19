import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/src/libs/prisma';
import { Prisma } from '@prisma/client';

export async function toggleSubtask(req: NextApiRequest, res: NextApiResponse) {
  try {
    const subtaskId = req.query.subtaskId as string;

    const oldSubtask = await prisma.subTask.findUniqueOrThrow({ where: { id: subtaskId } });
    await prisma.subTask.update({ data: { isCompleted: !oldSubtask.isCompleted }, where: { id: subtaskId } });

    res.json({ message: `Subtask is marked as ${!oldSubtask.isCompleted ? 'completed' : 'uncompleted'}.` });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return res
        .status(error.code === 'P2025' ? 404 : 400)
        .json({ message: error.meta?.cause ?? 'The subtask was not found.' });
    res.status(400).json({ message: error.message });
  }
}
