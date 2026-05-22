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
  ApiTags,
} from '@nestjs/swagger';

import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

import { JwtUser } from '@/shared/types/auth/jwt-user.type';

import { CreateRecurringTransactionDto } from './dto/create-recurring-transaction.dto';
import { UpdateRecurringTransactionDto } from './dto/update-recurring-transaction.dto';

import { RecurringTransactionsService } from './recurring-transactions.service';

@ApiTags('Recurring Transactions')
@ApiBearerAuth()
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
  create(
    @CurrentUser() user: JwtUser,
    @Body() dto: CreateRecurringTransactionDto,
  ) {
    return this.recurringTransactionsService.create(
      user.sub,
      dto,
    );
  }

  /*
    FIND ALL
  */
  @Get()
  findAll(@CurrentUser() user: JwtUser) {
    return this.recurringTransactionsService.findAll(
      user.sub,
    );
  }

  /*
    FIND ONE
  */
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: JwtUser,
  ) {
    return this.recurringTransactionsService.findOne(
      id,
      user.sub,
    );
  }

  /*
    UPDATE
  */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @CurrentUser() user: JwtUser,
    @Body() dto: UpdateRecurringTransactionDto,
  ) {
    return this.recurringTransactionsService.update(
      id,
      user.sub,
      dto,
    );
  }

  /*
    DELETE
  */
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @CurrentUser() user: JwtUser,
  ) {
    return this.recurringTransactionsService.remove(
      id,
      user.sub,
    );
  }
}