import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CurrentUser } from '@/common/decorators/current-user.decorator';

import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

import { JwtUser } from '@/shared/interfaces/jwt-user.interface';

import { LedgerService } from './services/ledger.service';

import { FindLedgerDto } from './dto/find-ledger.dto';

@ApiTags('Ledger')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('ledger')
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  @Get()
  @ApiOperation({
    summary: 'List ledger entries',
    description: 'Returns the complete financial ledger history',
  })
  @ApiResponse({
    status: 200,
    description: 'Ledger entries retrieved successfully',
  })
  @ApiQuery({
    name: 'accountId',
    required: false,
  })
  @ApiQuery({
    name: 'type',
    required: false,
    enum: ['CREDIT', 'DEBIT'],
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
  })
  findAll(@CurrentUser() user: JwtUser, @Query() filters: FindLedgerDto) {
    return this.ledgerService.findAll(user.sub, filters);
  }
}
