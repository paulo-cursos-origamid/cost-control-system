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

import { PayInvoiceDto } from './dto/pay-invoice.dto';

import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

import { CurrentUser } from '@/common/decorators/current-user.decorator';

import { JwtUser } from '@/shared/interfaces/jwt-user.interface';

import { CreateInvoiceDto } from './dto/create-invoice.dto';

import { CreditCardInvoicesService } from './credit-card-invoices.service';

import { SwaggerResponses } from '@/config/swagger/swagger.responses';

@ApiTags('Credit Card Invoices')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('credit-card-invoices')
export class CreditCardInvoicesController {
  constructor(private readonly invoicesService: CreditCardInvoicesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create invoice',
    description: 'Creates a new credit card invoice',
  })
  @ApiResponse({
    status: 201,
    description: 'Invoice created successfully',
  })
  create(@CurrentUser() user: JwtUser, @Body() dto: CreateInvoiceDto) {
    return this.invoicesService.create(user.sub, dto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find invoice by id',
  })
  @ApiParam({
    name: 'id',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Invoice retrieved successfully',
  })
  @ApiResponse(SwaggerResponses.notFound)
  findOne(@CurrentUser() user: JwtUser, @Param('id') id: string) {
    return this.invoicesService.findOne(user.sub, id);
  }

  @Get()
  @ApiOperation({
    summary: 'List invoices',
    description: 'Returns all user invoices',
  })
  @ApiResponse({
    status: 200,
    description: 'Invoices retrieved successfully',
  })
  findAll(@CurrentUser() user: JwtUser) {
    return this.invoicesService.findAll(user.sub);
  }

  @Patch(':id/close')
  @ApiOperation({
    summary: 'Close invoice',
    description: 'Closes a credit card invoice',
  })
  @ApiParam({
    name: 'id',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Invoice closed successfully',
  })
  closeInvoice(@CurrentUser() user: JwtUser, @Param('id') id: string) {
    return this.invoicesService.closeInvoice(user.sub, id);
  }

  @Post(':id/pay')
  @ApiOperation({
    summary: 'Pay invoice',
    description: 'Pays a credit card invoice',
  })
  @ApiParam({
    name: 'id',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Invoice paid successfully',
  })
  payInvoice(
    @CurrentUser() user: JwtUser,
    @Param('id') invoiceId: string,
    @Body() dto: PayInvoiceDto,
  ) {
    return this.invoicesService.payInvoice(user.sub, invoiceId, dto);
  }

  @Post('/close-expired')
  @ApiOperation({
    summary: 'Close expired invoices',
    description: 'Automatically closes expired invoices',
  })
  @ApiResponse({
    status: 200,
    description: 'Expired invoices closed successfully',
  })
  closeExpiredInvoices() {
    return this.invoicesService.closeExpiredInvoices();
  }
}
