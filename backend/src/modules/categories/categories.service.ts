import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

 async create(
  createCategoryDto: CreateCategoryDto,
  userId: string,
) {
  return this.prisma.category.create({
    data: {
      ...createCategoryDto,

      userId,
    },
  });
}

async findAll(userId: string) {
  return this.prisma.category.findMany({
    where: {
      OR: [
        {
          userId,
        },

        {
          isDefault: true,
        },
      ],
    },

    include: {
      children: true,
    },
  });
}

async findOne(
  id: string,
  userId: string,
) {
  const category =
    await this.prisma.category.findFirst({
      where: {
        id,

        OR: [
          {
            userId,
          },

          {
            isDefault: true,
          },
        ],
      },

      include: {
        children: true,
      },
    });

  if (!category) {
    throw new NotFoundException(
      'Category not found',
    );
  }

  return category;
}