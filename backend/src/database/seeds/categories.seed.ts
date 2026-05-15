import { PrismaClient, CategoryType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst();

  if (!user) {
    console.log('❌ Nenhum usuário encontrado.');
    return;
  }

  const categories = [
    // RECEITAS
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

    // DESPESAS
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

    // VEÍCULOS
    {
      name: 'Abastecimento',
      slug: 'abastecimento',
      description: 'Combustível do veículo',
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
        userId: user.id,
      },
    });

    if (!exists) {
      await prisma.category.create({
        data: {
          ...category,
          userId: user.id,
        },
      });

      console.log(`✅ Categoria criada: ${category.name}`);
    }
  }

  console.log('🚀 Seed finalizado.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
