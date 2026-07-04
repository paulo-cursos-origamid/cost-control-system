import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';

@Injectable()
export class SubCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateSubCategoryDto) {
    return this.prisma.subCategory.create({
      data: {
        name: dto.name,
        slug: dto.slug,
        categoryId: dto.categoryId,
        description: dto.description,
        color: dto.color,
        icon: dto.icon,
      },
    });
  }

  async findAll(categoryId?: string) {
    return this.prisma.subCategory.findMany({
      where: categoryId
        ? {
            categoryId,
          }
        : undefined,

      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const subCategory = await this.prisma.subCategory.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        category: true,
      },
    });

    if (!subCategory) {
      throw new NotFoundException('Subcategoria não encontrada');
    }

    return subCategory;
  }

  async update(id: string, dto: UpdateSubCategoryDto) {
    await this.findOne(id);

    return this.prisma.subCategory.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.subCategory.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
