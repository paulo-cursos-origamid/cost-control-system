import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma.module';

import { SubCategoriesController } from './sub-categories.controller';
import { SubCategoriesService } from './sub-categories.service';

@Module({
  imports: [PrismaModule],
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService],
  exports: [SubCategoriesService],
})
export class SubCategoriesModule {}
