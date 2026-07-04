import {
  PrismaClient,
  RecurrenceFrequency,
  TransactionType,
} from '@prisma/client';

const prisma = new PrismaClient();

export async function seedRecurringTransactions(
  userId: string,
  accountId: string,
  categoryId: string,
) {
  await prisma.recurringTransaction.create({
    data: {
      title: 'Internet',
      amount: 129.9,
      type: TransactionType.EXPENSE,
      frequency: RecurrenceFrequency.MONTHLY,
      startDate: new Date(),
      nextExecution: new Date(),
      userId,
      accountId,
      categoryId,
    },
  });
}
