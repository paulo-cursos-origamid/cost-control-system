import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma.module';

import { FuelSuppliesController } from './fuel-supplies.controller';
import { FuelSuppliesService } from './fuel-supplies.service';

@Module({
  imports: [PrismaModule],
  controllers: [FuelSuppliesController],
  providers: [FuelSuppliesService],
})
export class FuelSuppliesModule {}
