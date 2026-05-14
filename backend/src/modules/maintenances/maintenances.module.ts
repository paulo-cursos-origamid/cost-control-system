import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma.module';

import { MaintenancesController } from './maintenances.controller';
import { MaintenancesService } from './maintenances.service';

@Module({
  imports: [PrismaModule],
  controllers: [MaintenancesController],
  providers: [MaintenancesService],
})
export class MaintenancesModule {}
