import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma.module';

import { FinancialEngineModule } from '@/modules/financial-engine/financial-engine.module';

import { TransfersController } from './transfers.controller';
import { TransfersService } from './transfers.service';

@Module({
  imports: [PrismaModule, FinancialEngineModule],

  controllers: [TransfersController],

  providers: [TransfersService],
})
export class TransfersModule {}
