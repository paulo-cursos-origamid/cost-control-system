import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, data: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        name: data.name,
        type: data.type,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.category.findMany({
      where: {
        userId,
      },
    });
  }
}
