import { PrismaClient, Account, AccountType } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedAccounts(userId: string): Promise<Account[]> {
  const createdAccounts: Account[] = [];

  const accounts = [
    {
      name: 'Conta Principal',
      type: AccountType.CHECKING,
      color: '#000',
      balance: 0,
      initialBalance: 0,
      isActive: true,
      userId,
    },
  ];

  for (const account of accounts) {
    const exists = await prisma.account.findFirst({
      where: {
        name: account.name,
        userId,
      },
    });

    if (exists) {
      createdAccounts.push(exists);
      continue;
    }

    const created = await prisma.account.create({
      data: account,
    });

    createdAccounts.push(created);
  }

  return createdAccounts;
}
