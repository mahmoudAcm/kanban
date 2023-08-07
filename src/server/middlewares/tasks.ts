import { NextApiRequest } from 'next';
import prisma from '@/src/libs/prisma';
import isAuthenticated from '@/src/server/middlewares/auth';

export async function moveTaskMiddleware(req: NextApiRequest) {
  const data = req.body;
  const boardId = req.query.boardId as string;
  const taskId = req.query.taskId as string;
  const sourceColumnId = req.query.columnId as string;

  if (!data.destinationColumnId) return {};

  const userId = isAuthenticated(req);

  if (sourceColumnId !== data.destinationColumnId) {
    const newColumn = await prisma.column.findUniqueOrThrow({ where: { id: data.destinationColumnId, userId } });

    if (newColumn.boardId !== boardId) {
      (() => {
        throw new Error(
          "Sorry, but it's not possible to move the task to another board. You can only move it within the same board by selecting a different column."
        );
      })();
    }

    return prisma.task.update({
      data: {
        columnId: newColumn.id
      },
      where: { id: taskId, userId },
      include: {
        subtasks: true
      }
    });
  }

  return {};
}
