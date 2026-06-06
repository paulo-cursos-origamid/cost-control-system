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

import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

import { JwtUser } from '@/shared/types/auth/jwt-user.type';

import { CreateFuelSupplyDto } from './dto/create-fuel-supply.dto';
import { UpdateFuelSupplyDto } from './dto/update-fuel-supply.dto';

import { FuelSuppliesService } from './fuel-supplies.service';

import { SwaggerResponses } from '@/config/swagger/swagger.responses';

@ApiTags('Fuel Supplies')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('fuel-supplies')
export class FuelSuppliesController {
  constructor(private readonly fuelSuppliesService: FuelSuppliesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create fuel supply',
    description: 'Registers a fuel supply entry for a vehicle',
  })
  @ApiResponse({
    status: 201,
    description: 'Fuel supply created successfully',
  })
  @ApiResponse(SwaggerResponses.badRequest)
  create(@CurrentUser() user: JwtUser, @Body() dto: CreateFuelSupplyDto) {
    return this.fuelSuppliesService.create(user.sub, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'List fuel supplies',
    description: 'Returns all fuel supply records',
  })
  @ApiResponse({
    status: 200,
    description: 'Fuel supplies retrieved successfully',
  })
  findAll(@CurrentUser() user: JwtUser) {
    return this.fuelSuppliesService.findAll(user.sub);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get fuel supply by id',
  })
  @ApiParam({
    name: 'id',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  findOne(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.fuelSuppliesService.findOne(id, user.sub);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update fuel supply',
  })
  update(
    @Param('id') id: string,
    @CurrentUser() user: JwtUser,
    @Body() dto: UpdateFuelSupplyDto,
  ) {
    return this.fuelSuppliesService.update(id, user.sub, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete fuel supply',
  })
  remove(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.fuelSuppliesService.remove(id, user.sub);
  }
}
