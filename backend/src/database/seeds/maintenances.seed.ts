import { PrismaClient, Vehicle } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedMaintenances(vehicles: Vehicle[]) {
  console.log('🔧 Seeding maintenances...');

  for (const vehicle of vehicles) {
    await prisma.maintenance.create({
      data: {
        vehicleId: vehicle.id, // ✅ correto
        type: 'OIL_CHANGE',
        description: 'Troca de óleo preventiva',
        cost: 250,
        odometer: 15000,
        workshop: 'Auto Center',
        performedAt: new Date(),
      },
    });
    await prisma.maintenance.create({
      data: {
        vehicleId: vehicle.id,
        type: 'BRAKES',
        description: 'Pastilhas',
        cost: 850,
        odometer: 40000,
      },
    });
  }
}

// import { MaintenanceType, PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function seedMaintenances(vehicleId: string) {
//   await prisma.maintenance.create({
//     data: {
//       vehicleId,
//       type: MaintenanceType.OIL_CHANGE,
//       description: 'Troca de óleo',
//       cost: 350,
//       odometer: 32000,
//     },
//   });

//   await prisma.maintenance.create({
//     data: {
//       vehicleId,
//       type: MaintenanceType.BRAKES,
//       description: 'Pastilhas',
//       cost: 850,
//       odometer: 40000,
//     },
//   });
// }
