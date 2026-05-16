import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedUsers() {
  console.log('👤 Seeding users...');

  const exists = await prisma.user.findFirst({
    where: {
      email: 'admin@test.com',
    },
  });

  if (exists) {
    console.log('✔ User already exists');

    return exists;
  }

  const user = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@test.com',
      password: '123456',
    },
  });

  console.log('✔ User created');

  return user;
}
