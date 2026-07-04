import { PrismaClient } from '@prisma/client';
import { Vehicle } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedVehicles(userId: string) {
  const vehicles = [
    {
      name: 'Corolla',
      brand: 'Toyota',
      model: 'XEI',
      year: 2021,
      currentKm: 35000,
    },
    {
      name: 'Civic',
      brand: 'Honda',
      model: 'EXL',
      year: 2020,
      currentKm: 52000,
    },
  ];

  // const createdVehicles = [];

  const createdVehicles: Vehicle[] = [];

  for (const vehicle of vehicles) {
    const exists = await prisma.vehicle.findFirst({
      where: {
        name: vehicle.name,
        userId,
      },
    });

    if (exists) {
      createdVehicles.push(exists);
      continue;
    }

    const created = await prisma.vehicle.create({
      data: {
        ...vehicle,
        userId,
      },
    });

    createdVehicles.push(created);
  }

  return createdVehicles;
}
