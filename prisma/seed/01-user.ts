import { Prisma, PrismaClient } from '@prisma/client';

export const users: Prisma.UserCreateInput[] = [
  {
    name: 'Charles Xavier',
    role: 'ADMIN',
    email: 'reta@1.com',
    passwordHash: '$2a$10$6EgPRZqqBJIzIya.NknvZeJA9MN20EjSvfWgZwkf.Z6KYTM9eJm9W',
  },
  {
    name: 'Scott Summers',
    role: 'BACKOFFICE',
    email: 'reta@2.com',
    passwordHash: '$2a$10$6EgPRZqqBJIzIya.NknvZeJA9MN20EjSvfWgZwkf.Z6KYTM9eJm9W',
  }
];

export const user = async (prisma: PrismaClient) => {
  for (const obj of Object.values(users)) {
    await prisma.user.upsert({
      where: { email: obj.email },
      update: {},
      create: {
        ...obj,
      },
    });
  }
};
