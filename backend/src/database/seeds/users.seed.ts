import bcrypt from 'bcrypt';
import { PrismaClient, UserRole, User } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedUsers(): Promise<User[]> {
  console.log('👤 Seeding users...');

  const passwordHash = await bcrypt.hash('123456', 10);

  const usersBase = [
    {
      name: 'Administrador',
      email: 'admin@ccp.com',
      role: UserRole.ADMIN,
    },
    {
      name: 'João Silva',
      email: 'joao@ccp.com',
      role: UserRole.USER,
    },
    {
      name: 'Maria Oliveira',
      email: 'maria@ccp.com',
      role: UserRole.MANAGER,
    },
    {
      name: 'Suporte',
      email: 'support@ccp.com',
      role: UserRole.SUPPORT,
    },
  ];

  const createdUsers: User[] = [];

  for (const user of usersBase) {
    const exists = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (exists) {
      createdUsers.push(exists);
      continue;
    }

    const created = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        password: passwordHash, // ✅ AQUI está o fix
      },
    });

    createdUsers.push(created);

    console.log(`✔ User created: ${created.email}`);
  }

  return createdUsers;
}
