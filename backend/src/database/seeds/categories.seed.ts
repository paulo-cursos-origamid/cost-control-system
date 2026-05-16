import { CategoryType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedCategories(userId: string) {
  console.log('📂 Seeding categories...');

  const categories = [
    // INCOME
    {
      name: 'Salário',
      slug: 'salario',
      description: 'Recebimento salarial',
      type: CategoryType.INCOME,
    },

    {
      name: 'Freelance',
      slug: 'freelance',
      description: 'Serviços freelancer',
      type: CategoryType.INCOME,
    },

    // EXPENSE
    {
      name: 'Alimentação',
      slug: 'alimentacao',
      description: 'Mercado e restaurantes',
      type: CategoryType.EXPENSE,
    },

    {
      name: 'Moradia',
      slug: 'moradia',
      description: 'Aluguel e contas',
      type: CategoryType.EXPENSE,
    },

    // VEHICLE
    {
      name: 'Abastecimento',
      slug: 'abastecimento',
      description: 'Combustível',
      type: CategoryType.EXPENSE,
      isVehicleCategory: true,
    },

    {
      name: 'Manutenção Mecânica',
      slug: 'manutencao-mecanica',
      description: 'Serviços mecânicos',
      type: CategoryType.EXPENSE,
      isVehicleCategory: true,
    },

    {
      name: 'Borracharia',
      slug: 'borracharia',
      description: 'Pneus e rodas',
      type: CategoryType.EXPENSE,
      isVehicleCategory: true,
    },
  ];

  for (const category of categories) {
    const exists = await prisma.category.findFirst({
      where: {
        slug: category.slug,
        userId,
      },
    });

    if (!exists) {
      await prisma.category.create({
        data: {
          ...category,
          userId,
        },
      });

      console.log(`✔ Category created: ${category.name}`);
    }
  }

  return prisma.category.findMany({
    where: {
      userId,
    },
  });
}
