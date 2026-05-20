import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

import { JwtUser } from '@/shared/interfaces/jwt-user.interface';

import { LedgerService } from './ledger.service';
import { FindLedgerDto } from './dto/find-ledger.dto';

@ApiTags('Ledger')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ledger')
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  @Get()
  findAll(@CurrentUser() user: JwtUser, @Query() filters: FindLedgerDto) {
    return this.ledgerService.findAll(user.sub, filters);
  }
}
