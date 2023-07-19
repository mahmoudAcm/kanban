import prisma from '@/src/libs/prisma';

export async function getBoardMiddleware(id: string) {
  return prisma.board.findUnique({
    where: {
      id
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
