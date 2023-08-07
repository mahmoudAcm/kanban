import prisma from '@/src/libs/prisma';

export async function getBoardMiddleware(id: string, userId: string) {
  return prisma.board.findUnique({
    where: {
      id,
      userId
    },
    include: {
      columns: {
        include: {
          tasks: true
        }
      }
    }
  });
}
