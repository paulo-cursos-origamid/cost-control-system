import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedUsers() {
  console.log('👤 Seeding users...');

  const email = 'admin@email.com';

  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (exists) {
    console.log('✔ User already exists');

    return exists;
  }

  const user = await prisma.user.create({
    data: {
      name: 'Admin',
      email,
      password: '$2b$10$jFPBnGLQyDp7iMVh0g3RX.dYwZAOCTk00QL2At7tHuC5BsCKRG8nK',
    },
  });

  console.log('✅ User created');

  return user;
}
