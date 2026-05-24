import { ApiProperty } from '@nestjs/swagger';

import { IsDateString, IsUUID } from 'class-validator';

export class PayInvoiceDto {
  @ApiProperty()
  @IsUUID()
  accountId!: string;

  @ApiProperty()
  @IsDateString()
  paymentDate!: string;
}
