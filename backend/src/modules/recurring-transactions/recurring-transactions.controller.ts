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

import { CreateRecurringTransactionDto } from './dto/create-recurring-transaction.dto';

import { UpdateRecurringTransactionDto } from './dto/update-recurring-transaction.dto';

import { RecurringTransactionsService } from './recurring-transactions.service';

import { SwaggerResponses } from '@/config/swagger/swagger.responses';

@ApiTags('Recurring Transactions')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('recurring-transactions')
export class RecurringTransactionsController {
  constructor(
    private readonly recurringTransactionsService: RecurringTransactionsService,
  ) {}

  /*
    CREATE
  */
  @Post()
  @ApiOperation({
    summary: 'Create recurring transaction',
    description: 'Creates an automated recurring financial transaction',
  })
  @ApiResponse({
    status: 201,
    description: 'Recurring transaction created successfully',
  })
  @ApiResponse(SwaggerResponses.badRequest)
  create(
    @CurrentUser() user: JwtUser,
    @Body() dto: CreateRecurringTransactionDto,
  ) {
    return this.recurringTransactionsService.create(user.sub, dto);
  }

  /*
    FIND ALL
  */
  @Get()
  @ApiOperation({
    summary: 'List recurring transactions',
    description: 'Returns all recurring transactions from the user',
  })
  @ApiResponse({
    status: 200,
    description: 'Recurring transactions retrieved successfully',
  })
  findAll(@CurrentUser() user: JwtUser) {
    return this.recurringTransactionsService.findAll(user.sub);
  }

  /*
    FIND ONE
  */
  @Get(':id')
  @ApiOperation({
    summary: 'Find recurring transaction by id',
  })
  @ApiParam({
    name: 'id',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Recurring transaction retrieved successfully',
  })
  @ApiResponse(SwaggerResponses.notFound)
  findOne(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.recurringTransactionsService.findOne(id, user.sub);
  }

  /*
    UPDATE
  */
  @Patch(':id')
  @ApiOperation({
    summary: 'Update recurring transaction',
  })
  @ApiParam({
    name: 'id',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Recurring transaction updated successfully',
  })
  update(
    @Param('id') id: string,
    @CurrentUser() user: JwtUser,
    @Body() dto: UpdateRecurringTransactionDto,
  ) {
    return this.recurringTransactionsService.update(id, user.sub, dto);
  }

  /*
    DELETE
  */
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete recurring transaction',
  })
  @ApiParam({
    name: 'id',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Recurring transaction removed successfully',
  })
  remove(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.recurringTransactionsService.remove(id, user.sub);
  }
}
