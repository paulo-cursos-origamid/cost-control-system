import {
  PrismaClient,
  TransactionType,
  Account,
  Category,
  Vehicle,
} from '@prisma/client';

const prisma = new PrismaClient();

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDateInYear() {
  const month = random(0, 11);
  const day = random(1, 28);
  return new Date(2025, month, day);
}

type TransactionSeed = {
  title: string;
  amount: number;
  type: TransactionType;
  date: Date;
  categoryId: string;
};

export async function seedTransactions(
  userId: string,
  accounts: Account[],
  categories: Category[],
  vehicles: Vehicle[], // mantido só pra evitar quebra se ainda usa fora
) {
  console.log('💸 Seeding transactions...');

  const account = accounts[0];
  if (!account) return;

  const expenseCategories = categories.filter((c) => c.type === 'EXPENSE');

  const incomeCategory = categories.find((c) => c.type === 'INCOME');

  const transactions: TransactionSeed[] = [];

  // 💰 INCOME
  if (incomeCategory) {
    for (let i = 0; i < 6; i++) {
      transactions.push({
        title: 'Salário Mensal',
        amount: 5200,
        type: TransactionType.INCOME,
        date: randomDateInYear(),
        categoryId: incomeCategory.id,
      });
    }
  }

  // 💸 EXPENSES
  const expenseTemplates = [
    'Alimentação',
    'Supermercado',
    'Uber',
    'Gasolina',
    'Manutenção Veículo',
    'Farmácia',
    'Lazer',
    'Streaming',
    'Restaurante',
    'Internet',
  ];

  for (let i = 0; i < 120; i++) {
    if (expenseCategories.length === 0) break;

    const category = expenseCategories[random(0, expenseCategories.length - 1)];

    const title = expenseTemplates[random(0, expenseTemplates.length - 1)];

    transactions.push({
      title,
      amount: random(20, 900),
      type: TransactionType.EXPENSE,
      date: randomDateInYear(),
      categoryId: category.id,
    });
  }

  // 🔥 INSERT NO BANCO
  for (const t of transactions) {
    const exists = await prisma.transaction.findFirst({
      where: {
        title: t.title,
        userId,
        amount: t.amount,
      },
    });

    if (!exists) {
      await prisma.transaction.create({
        data: {
          ...t,
          userId,
          accountId: account.id,
        },
      });
    }
  }

  console.log('✔ Transactions seeded');
}
