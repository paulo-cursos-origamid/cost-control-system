import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

import { CurrentUser } from '@/common/decorators/current-user.decorator';

import { JwtUser } from '@/shared/interfaces/jwt-user.interface';

import { CreateInstallmentDto } from './dto/create-installment.dto';

import { InstallmentsService } from './installments.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Installments')
@ApiBearerAuth()
@Controller('installments')
@UseGuards(JwtAuthGuard)
export class InstallmentsController {
  constructor(private readonly installmentsService: InstallmentsService) {}

  @Post()
  create(@CurrentUser() user: JwtUser, @Body() dto: CreateInstallmentDto) {
    return this.installmentsService.create(user.sub, dto);
  }

  @Get()
  findAll(@CurrentUser() user: JwtUser) {
    return this.installmentsService.findAll(user.sub);
  }
}
