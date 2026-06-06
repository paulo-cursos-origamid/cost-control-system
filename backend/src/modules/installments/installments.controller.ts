import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

import { CurrentUser } from '@/common/decorators/current-user.decorator';

import { JwtUser } from '@/shared/interfaces/jwt-user.interface';

import { CreateInstallmentDto } from './dto/create-installment.dto';

import { InstallmentsService } from './installments.service';
import { SwaggerResponses } from '../../config/swagger/swagger.responses';

@ApiTags('Installments')
@ApiBearerAuth('JWT-auth')
@Controller('installments')
@UseGuards(JwtAuthGuard)
export class InstallmentsController {
  constructor(private readonly installmentsService: InstallmentsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create installment purchase',
    description: 'Creates a purchase divided into installments',
  })
  @ApiResponse({
    status: 201,
    description: 'Installment created successfully',
  })
  @ApiResponse(SwaggerResponses.badRequest)
  create(@CurrentUser() user: JwtUser, @Body() dto: CreateInstallmentDto) {
    return this.installmentsService.create(user.sub, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'List installments',
    description: 'Returns all installment purchases from the user',
  })
  @ApiResponse({
    status: 200,
    description: 'Installments retrieved successfully',
  })
  findAll(@CurrentUser() user: JwtUser) {
    return this.installmentsService.findAll(user.sub);
  }
}
