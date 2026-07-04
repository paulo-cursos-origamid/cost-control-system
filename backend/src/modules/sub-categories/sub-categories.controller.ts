import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { SubCategoriesService } from './sub-categories.service';

@Controller('sub-categories')
@UseGuards(JwtAuthGuard)
export class SubCategoriesController {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @Post()
  create(
    @Body()
    dto: CreateSubCategoryDto,
  ) {
    return this.subCategoriesService.create('', dto);
  }

  @Get()
  findAll(@Query('categoryId') categoryId?: string) {
    return this.subCategoriesService.findAll(categoryId);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.subCategoriesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id')
    id: string,
    @Body()
    dto: UpdateSubCategoryDto,
  ) {
    return this.subCategoriesService.update(id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id')
    id: string,
  ) {
    return this.subCategoriesService.remove(id);
  }
}
