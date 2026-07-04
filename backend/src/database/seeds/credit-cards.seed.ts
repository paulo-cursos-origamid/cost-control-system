import { PrismaClient, CreditCard } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedCreditCards(userId: string): Promise<CreditCard[]> {
  const cardsData = [
    {
      name: 'Nubank Roxinho',
      bank: 'Nubank',
      brand: 'Mastercard',
      limit: 12000,
      closingDay: 8,
      dueDay: 15,
      userId,
    },
  ];

  const created: CreditCard[] = [];

  for (const card of cardsData) {
    const existing = await prisma.creditCard.findFirst({
      where: {
        userId,
        name: card.name,
      },
    });

    if (existing) {
      created.push(existing);
      continue;
    }

    const createdCard = await prisma.creditCard.create({
      data: card,
    });

    created.push(createdCard);
  }

  return created;
}
