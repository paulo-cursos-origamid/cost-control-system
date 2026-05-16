import { AccountType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedAccounts(userId: string) {
  console.log('🏦 Seeding accounts...');

  const accounts = [
    {
      name: 'Conta Principal',
      type: AccountType.CHECKING,
      balance: 5000,
    },

    {
      name: 'Poupança',
      type: AccountType.SAVINGS,
      balance: 12000,
    },

    {
      name: 'Carteira',
      type: AccountType.CASH,
      balance: 300,
    },
  ];

  for (const account of accounts) {
    const exists = await prisma.account.findFirst({
      where: {
        name: account.name,
        userId,
      },
    });

    if (!exists) {
      await prisma.account.create({
        data: {
          ...account,
          userId,
        },
      });

      console.log(`✔ Account created: ${account.name}`);
    }
  }

  return prisma.account.findMany({
    where: {
      userId,
    },
  });
}
