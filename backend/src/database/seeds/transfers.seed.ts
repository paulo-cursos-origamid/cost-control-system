import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedTransfers(
  userId: string,
  fromAccountId: string,
  toAccountId: string,
) {
  console.log('🔄 Seeding transfers...');

  if (fromAccountId === toAccountId) {
    console.log('⚠️ Transfer skipped: same accounts');
    return;
  }

  const exists = await prisma.transfer.findFirst({
    where: {
      userId,
      fromAccountId,
      toAccountId,
      amount: 500,
      description: 'Transferência inicial entre contas',
    },
  });

  if (exists) {
    console.log('ℹ️ Transfer already exists.');
    return exists;
  }

  const transfer = await prisma.transfer.create({
    data: {
      userId,
      fromAccountId,
      toAccountId,
      amount: 500,
      description: 'Transferência inicial entre contas',
    },
  });

  console.log(`✔ Transfer created: ${fromAccountId} → ${toAccountId}`);

  return transfer;
}