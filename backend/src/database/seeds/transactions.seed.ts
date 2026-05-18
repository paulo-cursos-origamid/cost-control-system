import { PrismaClient, TransactionType } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedTransactions(userId: string) {
  console.log('💸 Seeding transactions...');

  const account = await prisma.account.findFirst({
    where: {
      userId,
    },
  });

  if (!account) {
    console.log('❌ No account found');

    return;
  }

  const salaryCategory = await prisma.category.findFirst({
    where: {
      slug: 'salario',
      userId,
    },
  });

  const fuelCategory = await prisma.category.findFirst({
    where: {
      slug: 'abastecimento',
      userId,
    },
  });

  const maintenanceCategory = await prisma.category.findFirst({
    where: {
      slug: 'manutencao-mecanica',
      userId,
    },
  });

  const transactions = [
    {
      title: 'Salário Mensal',
      amount: 5000,
      type: TransactionType.INCOME,
      categoryId: salaryCategory?.id,
    },

    {
      title: 'Abastecimento',
      amount: 250,
      type: TransactionType.EXPENSE,
      categoryId: fuelCategory?.id,
    },

    {
      title: 'Troca de óleo',
      amount: 400,
      type: TransactionType.EXPENSE,
      categoryId: maintenanceCategory?.id,
    },
  ];

  for (const transaction of transactions) {
    if (!transaction.categoryId) {
      continue;
    }

    const exists = await prisma.transaction.findFirst({
      where: {
        title: transaction.title,
        userId,
      },
    });

    if (!exists) {
      await prisma.transaction.create({
        data: {
          title: transaction.title,
          amount: transaction.amount,
          type: transaction.type,
          date: new Date(),

          userId,

          accountId: account.id,

          categoryId: transaction.categoryId,
        },
      });

      console.log(`✔ Transaction created: ${transaction.title}`);
    }
  }
}
