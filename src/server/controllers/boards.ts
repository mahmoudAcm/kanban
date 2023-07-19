import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/src/libs/prisma';
import { Prisma } from '@prisma/client';
import * as yup from 'yup';
import { PayloadError } from '@/src/server/libs/customErrors';
import { InferType } from 'yup';
import { getBoardMiddleware } from '@/src/server/middlewares/boards';

export async function getBoards(req: NextApiRequest, res: NextApiResponse) {
  try {
    const boards = await prisma.board.findMany({
      include: {
        columns: {
          include: {
            tasks: {
              include: {
                subtasks: true
              }
            }
          }
        }
      }
    });

    res.json(boards);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function getBoard(req: NextApiRequest, res: NextApiResponse) {
  try {
    const boardId = req.query.boardId as string;
    const board = await prisma.board.findUniqueOrThrow({
      where: { id: boardId },
      include: {
        columns: {
          include: {
            tasks: {
              include: {
                subtasks: true
              }
            }
          }
        }
      }
    });

    res.json(board);
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return res
        .status(error.code === 'P2025' ? 404 : 400)
        .json({ message: error.meta?.cause ?? 'Board was not found.' });
    res.status(400).json({ message: error.message });
  }
}

export async function createBoard(req: NextApiRequest, res: NextApiResponse) {
  try {
    const schema = yup.object({
      name: yup.string().min(3, 'Board name must be at least 3 characters.').required('Please provide board name.'),
      columns: yup.array().of(
        yup.object({
          name: yup
            .string()
            .min(3, 'Column name must be at least 3 characters.')
            .required('Please provide the column name.')
        })
      )
    });

    const data = req.body as InferType<typeof schema>;

    schema.validateSync(data, {
      abortEarly: false
    });

    const newBoard = await prisma.board.create({
      data: {
        name: data.name
      }
    });

    await prisma.column.createMany({
      data: data.columns?.map(column => ({ boardId: newBoard.id, ...column })) ?? []
    });

    const board = await getBoardMiddleware(newBoard.id);

    res.status(201).json({ message: data.name + ' board was created.', board });
  } catch (error: any) {
    if (error instanceof yup.ValidationError) return res.status(400).json(PayloadError.getError(error));
    res.status(400).json({ message: error.message });
  }
}

export async function updateBoard(req: NextApiRequest, res: NextApiResponse) {
  try {
    const boardId = req.query.boardId as string;

    const schema = yup.object({
      name: yup.string().min(3, 'Board name must be at least 3 characters.'),
      columns: yup.array().of(
        yup.object({
          id: yup.string(),
          name: yup.string().min(3, 'Column name must be at least 3 characters.').required()
        })
      )
    });
    const data = req.body as InferType<typeof schema>;

    schema.validateSync(data, {
      abortEarly: false
    });

    if (data.name)
      await prisma.board.update({
        data: {
          name: data.name
        },
        where: {
          id: boardId
        }
      });

    const columnsWithId = data.columns?.filter(column => !!column?.id) ?? [];
    const columnsWithoutId = data.columns?.filter(column => !column?.id) ?? [];

    for (const column of columnsWithId) {
      await prisma.column.update({
        data: {
          name: column.name
        },
        where: {
          id: column.id
        }
      });
    }

    await prisma.column.deleteMany({
      where: {
        boardId,
        id: {
          notIn: columnsWithId.map(column => column.id!)
        }
      }
    });

    await prisma.column.createMany({
      data: columnsWithoutId.map(column => ({ boardId, ...column }))
    });

    const board = await getBoardMiddleware(boardId);

    res.status(200).json({ message: data.name + ' board was updated.', board });
  } catch (error: any) {
    if (error instanceof yup.ValidationError) return res.status(400).json(PayloadError.getError(error));
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return res
        .status(error.code === 'P2025' ? 404 : 400)
        .json({ message: error.code === 'P2025' ? 'This board does not exists.' : error.meta?.cause });
    res.status(400).json({ message: error.message });
  }
}

export async function deleteBoard(req: NextApiRequest, res: NextApiResponse) {
  try {
    const boardId = req.query.boardId as string;

    await prisma.board.delete({
      where: {
        id: boardId
      }
    });

    res.json({ message: 'Board was deleted.' });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return res
        .status(error.code === 'P2025' ? 404 : 400)
        .json({ message: error.code === 'P2025' ? 'This board does not exists.' : error.meta?.cause });
    res.status(400).json({ message: error.message });
  }
}
