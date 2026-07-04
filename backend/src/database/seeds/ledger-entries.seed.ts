import { LedgerEntryType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedLedgerEntries(userId: string, accountId: string) {
  console.log('📒 Seeding ledger entries...');

  const exists = await prisma.ledgerEntry.findFirst({
    where: {
      userId,
      accountId,
      description: 'Saldo inicial',
    },
  });

  if (exists) {
    console.log('ℹ️ Ledger already seeded.');
    return exists;
  }

  const ledger = await prisma.ledgerEntry.create({
    data: {
      userId,
      accountId,
      type: LedgerEntryType.CREDIT,
      amount: 5000,
      description: 'Saldo inicial',
    },
  });

  console.log('✔ Ledger created');

  return ledger;
}
