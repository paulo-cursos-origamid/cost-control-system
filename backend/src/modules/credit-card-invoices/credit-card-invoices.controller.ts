import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { PayInvoiceDto } from './dto/pay-invoice.dto';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

import { CurrentUser } from '@/common/decorators/current-user.decorator';

import { JwtUser } from '@/shared/interfaces/jwt-user.interface';

import { CreateInvoiceDto } from './dto/create-invoice.dto';

import { CreditCardInvoicesService } from './credit-card-invoices.service';

@ApiTags('Credit Card Invoices')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('credit-card-invoices')
export class CreditCardInvoicesController {
  constructor(private readonly invoicesService: CreditCardInvoicesService) {}

  @Post()
  create(
    @CurrentUser() user: JwtUser,

    @Body() dto: CreateInvoiceDto,
  ) {
    return this.invoicesService.create(user.sub, dto);
  }

  @Get()
  findAll(@CurrentUser() user: JwtUser) {
    return this.invoicesService.findAll(user.sub);
  }

  @Patch(':id/close')
  closeInvoice(
    @CurrentUser() user: JwtUser,

    @Param('id') id: string,
  ) {
    return this.invoicesService.closeInvoice(user.sub, id);
  }
  @Post(':id/pay')
  payInvoice(
    @CurrentUser() user: JwtUser,
    @Param('id') invoiceId: string,
    @Body() dto: PayInvoiceDto,
  ) {
    return this.invoicesService.payInvoice(user.sub, invoiceId, dto);
  }
}
