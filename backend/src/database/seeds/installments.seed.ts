import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedInstallments(
  userId: string,
  accountId: string,
  categoryId: string,
) {
  for (let i = 1; i <= 12; i++) {
    await prisma.installment.create({
      data: {
        title: 'Notebook Dell',
        totalAmount: 7200,
        installmentAmount: 600,
        totalInstallments: 12,
        currentInstallment: i,
        purchaseDate: new Date(),
        dueDate: new Date(2025, i, 5),
        accountId,
        categoryId,
        userId,
      },
    });
  }
}
