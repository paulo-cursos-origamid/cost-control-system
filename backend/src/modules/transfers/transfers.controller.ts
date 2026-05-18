import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

import { JwtUser } from '@/shared/interfaces/jwt-user.interface';

import { CreateTransferDto } from './dto/create-transfer.dto';
import { TransfersService } from './transfers.service';

@Controller('transfers')
@UseGuards(JwtAuthGuard)
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  /*
    Criar transferência
  */
  @Post()
  create(@CurrentUser() user: JwtUser, @Body() data: CreateTransferDto) {
    return this.transfersService.create(user.sub, data);
  }

  /*
    Listar transferências
  */
  @Get()
  findAll(@CurrentUser() user: JwtUser) {
    return this.transfersService.findAll(user.sub);
  }
}
