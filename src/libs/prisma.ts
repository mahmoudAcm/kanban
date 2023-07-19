import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;
const __self = global as typeof globalThis & { prisma: PrismaClient };

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!__self.prisma) {
    __self.prisma = new PrismaClient();
  }
  prisma = __self.prisma;
}

export default prisma;
