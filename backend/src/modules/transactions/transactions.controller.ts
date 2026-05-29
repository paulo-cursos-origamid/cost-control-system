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
  Req,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

import { JwtUser } from '@/shared/types/auth/jwt-user.type';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FindTransactionsDto } from './dto/find-transactions.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

import { TransactionsService } from './services/transactions.service';

@ApiTags('Transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  /*
    =========================
    CREATE
    =========================
  */
  @Post()
  create(@CurrentUser() user: JwtUser, @Body() dto: CreateTransactionDto) {
    return this.transactionsService.create(user.sub, dto);
  }

  /*
    =========================
    FIND ALL
    =========================
  */
  @Get()
  findAll(
    @CurrentUser() user: JwtUser,
    @Req() req,
    @Query() filters: FindTransactionsDto,
  ) {
    return this.transactionsService.findAll(user.sub, filters);
  }

  /*
    =========================
    SUMMARY
    =========================
  */
  @Get('summary')
  summary(@CurrentUser() user: JwtUser) {
    return this.transactionsService.summary(user.sub);
  }

  /*
    =========================
    FIND ONE
    =========================
  */
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.transactionsService.findOne(id, user.sub);
  }

  /*
    =========================
    UPDATE
    =========================
  */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @CurrentUser() user: JwtUser,
    @Body() dto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(id, user.sub, dto);
  }

  /*
    =========================
    DELETE
    =========================
  */
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.transactionsService.remove(id, user.sub);
  }

  /*
    =========================
    DELETE
    =========================
  */
  @Patch(':id/restore')
  restore(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.transactionsService.restore(id, user.sub);
  }
}
