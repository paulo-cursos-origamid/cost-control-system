import { Vehicle, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedFuelSupplies(vehicles: Vehicle[]) {
  console.log('⛽ Seeding fuel supplies...');

  for (const vehicle of vehicles) {
    for (let month = 0; month < 12; month++) {
      await prisma.fuelSupply.create({
        data: {
          vehicleId: vehicle.id, // ✅ agora correto
          fuelType: 'GASOLINE',
          liters: 40,
          pricePerLiter: 5.8,
          totalAmount: 232,
          odometer: 10000 + month * 1000,
          fullTank: true,
        },
      });
    }
  }
}
