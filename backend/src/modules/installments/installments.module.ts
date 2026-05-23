import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma.module';

import { InstallmentsController } from './installments.controller';

import { InstallmentsService } from './installments.service';

@Module({
  imports: [PrismaModule],

  controllers: [InstallmentsController],

  providers: [InstallmentsService],
})
export class InstallmentsModule {}
