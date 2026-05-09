import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

import { CurrentUser } from '@/common/decorators/current-user.decorator';

import { CategoriesService } from './categories.service';

import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('Categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(
    @CurrentUser('userId') userId: string,
    @Body() data: CreateCategoryDto,
  ) {
    return this.categoriesService.create(userId, data);
  }

  @Get()
  findAll(@CurrentUser('userId') userId: string) {
    return this.categoriesService.findAll(userId);
  }
}
