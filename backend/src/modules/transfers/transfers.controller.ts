import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

import { CurrentUser } from '@/common/decorators/current-user.decorator';

import { JwtUser } from '@/shared/interfaces/jwt-user.interface';

import { CreateTransferDto } from './dto/create-transfer.dto';

import { TransfersService } from './transfers.service';

import { SwaggerResponses } from '@/config/swagger/swagger.responses';

@Controller('transfers')
@ApiTags('Transfers')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  /*
    Criar transferência
  */
  @Post()
  @ApiOperation({
    summary: 'Create transfer',
    description: 'Transfers money between financial accounts',
  })
  @ApiResponse({
    status: 201,
    description: 'Transfer created successfully',
  })
  @ApiResponse(SwaggerResponses.badRequest)
  create(@CurrentUser() user: JwtUser, @Body() data: CreateTransferDto) {
    return this.transfersService.create(user.sub, data);
  }

  /*
    Listar transferências
  */
  @Get()
  @ApiOperation({
    summary: 'List transfers',
    description: 'Returns all account transfers from the user',
  })
  @ApiResponse({
    status: 200,
    description: 'Transfers retrieved successfully',
  })
  findAll(@CurrentUser() user: JwtUser) {
    return this.transfersService.findAll(user.sub);
  }
}
