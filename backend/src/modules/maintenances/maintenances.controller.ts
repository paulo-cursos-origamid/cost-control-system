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

import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

import { JwtUser } from '@/shared/types/auth/jwt-user.type';

import { MaintenancesService } from './maintenances.service';

import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';

import { SwaggerResponses } from '@/config/swagger/swagger.responses';

@ApiTags('Maintenances')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('maintenances')
export class MaintenancesController {
  constructor(private readonly maintenancesService: MaintenancesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create maintenance',
    description: 'Registers a vehicle maintenance record',
  })
  @ApiResponse({
    status: 201,
    description: 'Maintenance created successfully',
  })
  @ApiResponse(SwaggerResponses.badRequest)
  create(@CurrentUser() user: JwtUser, @Body() dto: CreateMaintenanceDto) {
    return this.maintenancesService.create(user.sub, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'List maintenances',
    description: 'Returns all vehicle maintenance records',
  })
  @ApiResponse({
    status: 200,
    description: 'Maintenances retrieved successfully',
  })
  findAll(@CurrentUser() user: JwtUser) {
    return this.maintenancesService.findAll(user.sub);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get maintenance by id',
  })
  @ApiParam({
    name: 'id',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Maintenance retrieved successfully',
  })
  @ApiResponse(SwaggerResponses.notFound)
  findOne(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.maintenancesService.findOne(id, user.sub);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update maintenance',
  })
  @ApiParam({
    name: 'id',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  update(
    @Param('id') id: string,
    @CurrentUser() user: JwtUser,
    @Body() dto: UpdateMaintenanceDto,
  ) {
    return this.maintenancesService.update(id, user.sub, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete maintenance',
  })
  @ApiParam({
    name: 'id',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  remove(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.maintenancesService.remove(id, user.sub);
  }
}
