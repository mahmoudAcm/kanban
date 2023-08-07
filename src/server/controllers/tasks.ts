import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';
import { HTTPNotAuthorizedError, PayloadError } from '@/src/server/libs/customErrors';
import prisma from '@/src/libs/prisma';
import { Prisma } from '@prisma/client';
import { moveTaskMiddleware } from '@/src/server/middlewares/tasks';
import { InferType } from 'yup';
import isAuthenticated from '@/src/server/middlewares/auth';

type Subtask = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export async function getTask(req: NextApiRequest, res: NextApiResponse) {
  try {
    const taskId = req.query.taskId as string;
    const userId = isAuthenticated(req);

    const task = await prisma.task.findUniqueOrThrow({
      where: {
        id: taskId,
        userId
      },
      include: {
        subtasks: true
      }
    });

    res.json(task);
  } catch (error: any) {
    if (error instanceof HTTPNotAuthorizedError) return res.status(401).json(error.getError());
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return res
        .status(error.code === 'P2025' ? 404 : 400)
        .json({ message: error.meta?.cause ?? 'Task was not found.' });
    res.status(400).json({ message: error.message });
  }
}

export async function createTask(req: NextApiRequest, res: NextApiResponse) {
  try {
    const schema = yup.object({
      title: yup.string().min(3, 'Title must be at least 3 characters.').required('Please provide a title.'),
      subtasks: yup.array().of(
        yup.object({
          title: yup.string().min(3, 'Title must be at least 3 characters.').required('Please provide a title.'),
          isCompleted: yup.boolean().optional()
        })
      )
    });

    const data = req.body as InferType<typeof schema>;

    const columnId = req.query.columnId as string;
    const boardId = req.query.boardId as string;

    const userId = isAuthenticated(req);

    const column = await prisma.column.findUniqueOrThrow({
      where: { id: columnId, boardId, userId },
      select: {
        name: true
      }
    });

    schema.validateSync(data, {
      abortEarly: false
    });

    const newTask = await prisma.task.create({
      data: {
        ...data,
        subtasks: undefined,
        columnId,
        userId
      }
    });

    await prisma.subTask.createMany({
      data: data.subtasks?.map(subtask => ({ taskId: newTask.id, ...subtask, userId })) ?? []
    });

    const task = await prisma.task.findUnique({
      where: { id: newTask.id, userId },
      include: {
        subtasks: true
      }
    });

    res.status(201).json({ message: task!.title + ' task was created.', task });
  } catch (error: any) {
    console.log(error);
    if (error instanceof HTTPNotAuthorizedError) return res.status(401).json(error.getError());
    if (error instanceof yup.ValidationError) return res.status(400).json(PayloadError.getError(error));
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return res.status(error.code === 'P2025' ? 404 : 400).json(
        error.code === 'P2025'
          ? {
              message: 'Their is no column or board was found.'
            }
          : {
              message: error.meta?.cause
            }
      );
    res.status(400).json({ message: error.message });
  }
}

export async function updateTask(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.body;
    const taskId = req.query.taskId as string;

    const schema = yup.object({
      title: yup.string().min(3, 'Title must be at least 3 characters.'),
      subtasks: yup.array().of(
        yup.object({
          title: yup.string().min(3, 'Title must be at least 3 characters.')
        })
      )
    });

    schema.validateSync(data);

    const userId = isAuthenticated(req);

    const subtasksWithId: Subtask[] = data.subtasks?.filter((subtask: Subtask) => !!subtask.id) ?? [];
    const subtasksWithoutId: Subtask[] = data.subtasks?.filter((subtask: Subtask) => !subtask.id) ?? [];

    for (const subtask of subtasksWithId) {
      await prisma.subTask.update({
        data: {
          title: subtask.title
        },
        where: {
          id: subtask.id,
          userId
        }
      });
    }

    await prisma.subTask.deleteMany({
      where: {
        taskId,
        userId,
        id: {
          notIn: subtasksWithId.map(subtask => subtask.id)
        }
      }
    });

    await prisma.subTask.createMany({
      data: subtasksWithoutId.map(subtask => ({ taskId, ...subtask, userId }))
    });

    await moveTaskMiddleware(req);

    const task = await prisma.task.update({
      data: {
        title: data.title,
        description: data.description
      },
      where: { id: taskId, userId },
      include: {
        subtasks: true
      }
    });

    res.json(task);
  } catch (error: any) {
    if (error instanceof HTTPNotAuthorizedError) return res.status(401).json(error.getError());
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return res
        .status(error.code === 'P2025' ? 404 : 400)
        .json({ message: error.meta?.cause ?? 'The column you want to move the task to was not found.' });
    res.status(400).json({ message: error.message });
  }
}

export async function moveTask(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.json(await moveTaskMiddleware(req));
  } catch (error: any) {
    if (error instanceof HTTPNotAuthorizedError) return res.status(401).json(error.getError());
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return res.status(error.code === 'P2025' ? 404 : 400).json({
        message: ((error.meta?.cause ?? 'The column you want to move the task to was not found.') as string).replace(
          'Record',
          'Task'
        )
      });
    res.status(400).json({ message: error.message });
  }
}

export async function deleteTask(req: NextApiRequest, res: NextApiResponse) {
  try {
    const taskId = req.query.taskId as string;
    const userId = isAuthenticated(req);

    const task = await prisma.task.delete({ where: { id: taskId, userId } });
    res.json({ message: task.title + ' task was deleted.' });
  } catch (error: any) {
    if (error instanceof HTTPNotAuthorizedError) return res.status(401).json(error.getError());
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return res
        .status(error.code === 'P2025' ? 404 : 400)
        .json({ message: error.code === 'P2025' ? 'The task you want to delete was not found.' : error.meta?.cause });
    res.status(400).json({ message: error.message });
  }
}
