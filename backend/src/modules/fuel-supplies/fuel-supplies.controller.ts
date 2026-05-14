import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

import { JwtUser } from '@/shared/types/auth/jwt-user.type';

import { CreateFuelSupplyDto } from './dto/create-fuel-supply.dto';
import { UpdateFuelSupplyDto } from './dto/update-fuel-supply.dto';
import { FuelSuppliesService } from './fuel-supplies.service';

@ApiTags('Fuel Supplies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('fuel-supplies')
export class FuelSuppliesController {
  constructor(private readonly fuelSuppliesService: FuelSuppliesService) {}

  @Post()
  create(@CurrentUser() user: JwtUser, @Body() dto: CreateFuelSupplyDto) {
    return this.fuelSuppliesService.create(user.sub, dto);
  }

  @Get()
  findAll(@CurrentUser() user: JwtUser) {
    return this.fuelSuppliesService.findAll(user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.fuelSuppliesService.findOne(id, user.sub);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @CurrentUser() user: JwtUser,
    @Body() dto: UpdateFuelSupplyDto,
  ) {
    return this.fuelSuppliesService.update(id, user.sub, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.fuelSuppliesService.remove(id, user.sub);
  }
}
