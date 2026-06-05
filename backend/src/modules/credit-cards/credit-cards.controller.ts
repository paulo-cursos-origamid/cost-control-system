import {
  Body,
  Controller,
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

import { JwtUser } from '@/shared/interfaces/jwt-user.interface';

import { CreateCreditCardDto } from './dto/create-credit-card.dto';

import { CreditCardsService } from './credit-cards.service';

import { SwaggerResponses } from '@/config/swagger/swagger.responses';

@ApiTags('Credit Cards')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('credit-cards')
export class CreditCardsController {
  constructor(private readonly creditCardsService: CreditCardsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create credit card',
    description: 'Creates a new credit card',
  })
  @ApiResponse({
    status: 201,
    description: 'Credit card created successfully',
  })
  @ApiResponse(SwaggerResponses.badRequest)
  create(@CurrentUser() user: JwtUser, @Body() dto: CreateCreditCardDto) {
    return this.creditCardsService.create(user.sub, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'List credit cards',
    description: 'Returns all user credit cards',
  })
  @ApiResponse({
    status: 200,
    description: 'Credit cards retrieved successfully',
  })
  findAll(@CurrentUser() user: JwtUser) {
    return this.creditCardsService.findAll(user.sub);
  }

  @Patch(':id/deactivate')
  @ApiOperation({
    summary: 'Deactivate credit card',
    description: 'Soft deactivate a credit card',
  })
  @ApiParam({
    name: 'id',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Credit card deactivated successfully',
  })
  @ApiResponse(SwaggerResponses.notFound)
  deactivate(@CurrentUser() user: JwtUser, @Param('id') id: string) {
    return this.creditCardsService.deactivate(user.sub, id);
  }
}
