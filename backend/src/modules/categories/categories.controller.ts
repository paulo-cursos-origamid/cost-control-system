import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CategoriesService } from './categories.service';

import { CreateCategoryDto } from './dto/create-category.dto';

import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

import { CurrentUser } from '@/common/decorators/current-user.decorator';

import { JwtUser } from '@/shared/interfaces/jwt-user.interface';

@ApiTags('Categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto,

    @CurrentUser() user: JwtUser,
  ) {
    return this.categoriesService.create(createCategoryDto, user.sub);
  }

  @Get()
  findAll(@CurrentUser() user: JwtUser) {
    return this.categoriesService.findAll(user.sub);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,

    @CurrentUser() user: JwtUser,
  ) {
    return this.categoriesService.findOne(id, user.sub);
  }
}
